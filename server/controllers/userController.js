import { User } from 'models'
import { hashSync, compareSync } from 'bcrypt'
import {
  userValidation, createToken,
  createId, sendSignUpEmail,
  isEmpty
} from 'utils'
import { appDomainName } from 'serverConfig'

const userController = {};

userController.login = (req, res) => {
  const { email, phone, password } = req.body;
  const query = {
    ...(email ? {email} : {phone})
  };

  User.findOne(query)
    .then(user => {
      if (!user) {
        return res.status(404).json({
          message: 'Такого пользователя у нас нет!'
        })
      }
      // check password
      if (compareSync(password, user.password_digest)) {
        const token = createToken(user);

        return User.findOneAndUpdate(query, {token})
          .then(() => {
            return res.status(200).json({
              success: true,
              data: {token}
            })
          })
          .catch(err => {
            return res.status(500).json({
              message: err
            })
          })
      }

      return res.status(401).json({
        message: 'Неправильный пароль.',
        errors: {
          password: 'Вы ввели неправильный пароль.'
        }
      })
    })
    .catch(err => {
      return res.status(500).json({
        message: err
      })
    })
};
userController.checkAuth = (req, res) => {
  const { user } = req;
  if (!req.user) {
    return res.status(401).json({
      success: false
    })
  }

  const token = createToken(user);
  User.findOneAndUpdate({token: user.token}, {token})
    .then(() => {
      res.status(200).json({
        success: true,
        data: {token}
      })
    })
    .catch(err => {
      res.status(500).json({
        message: err
      })
    })
};
userController.logout = (req, res) => {
  const { user } = req;
  const query = {_id: user.id || user._id};
  const update = {token: ''};
  User.findOneAndUpdate(query, update)
    .then(() => {
      res.status(200).json({
        success: true, token: null
      })
    })
    .catch(err => {
      res.status(500).json({
        message: err
      })
    })
};
userController.signup = (req, res) => {
  const {
    name, phone, email,
    password
  } = req.body;

  userValidation({name, phone, email, password})
    .then(({isValid, errors}) => {
      if (!isValid) {
        return res.status(400).json({
          errors: {
            ...errors,
            formImport: true
          }
        })
      }

      // Validation
      const verifyToken = createId();
      const user = new User({
        name, phone, email,
        password_digest: hashSync(password, 10),
        verifyToken
      });

      user.save().then(data => {
        const token = createToken(data);
        return User.findByIdAndUpdate((data.id || data._id), {token})
          .then(() => {
            res.status(200).json({
              success: true,
              data: {token}
            })
            sendSignUpEmail({
              id: verifyToken,
              email,
              name
            })
          })
          .catch(err => {
            res.status(500).json({
              message: err
            })
          })
      }).catch(err => {
        res.status(500).json({
          message: err
        })
      })
    })
};
userController.verifyUser = (req, res) => {
  const token = req.params.token;
  const query = {verifyToken: token};

  User.findOne(query)
    .then(user => {
      if (!user) {
        return res.send(
          `<script>alert('Ваша ссылка устарела и аккаунт не был подтвержден!')</script>`
        )
      }
      if (!user._id || user.verified || user.banned) {
        if (user.banned) {
          return res.send(
            `<script>alert('Нас не проведешь - мы знам что вы агент!')</script>`
          )
        }
        if (user.verified) {
          return res.redirect(`${appDomainName}/you`)
        }
      }

      return User.findOneAndUpdate(query, {
        verifyToken: '',
        verified: true
      }).then(() => {
        res.redirect(`${appDomainName}/you`)
      }).catch(err => {
        res.status(500).send(
          `<h1>Произошла ошибка 500</h1>
           <p>${err.toString()}</p>`
        )
      })
    })
    .catch(err => {
      res.status(500).send(
        `<h1>Произошла ошибка 500</h1>
         <p>${err.toString()}</p>`
      )
  })
};

userController.update = (req, res) => {
  let { data, id } = req.body;

  // only admins can set admin state
  if (!req.user.isAdmin) {
    delete data.isAdmin;
  }

  userValidation(data, id, true).then(({isValid, status, err, errors}) => {
    if (!isValid) {
      if (status) {
        return res.status(status).json({
          message: status === 404
            ? 'Произошла ошибка, мы не нашли вас в нашей базе пользователей'
            : err.toString()
        })
      }

      return res.status(400).json({
        errors: {
          ...errors,
          formImport: true
        }
      })
    }

    if (isEmpty(!data.password_new)) {
      data.password = data.password_new;
      delete data.password_new;
    } else {
      delete data.password;
    }

    if (!isEmpty(data.email) && req.user.email !== data.email) {
      data.verified = false;
      data.verifyToken = createId();
    }

    User
      .findByIdAndUpdate(id, { $set: data }, { new: true })
      .then(__data => {
        // update user token with new data
        const token = createToken(__data);

        User.findByIdAndUpdate(id, {token})
          .then(() => {
            res.status(200).json({
              success: true,
              data: {token}
            })
            if (data.verifyToken) {
              sendSignUpEmail({
                id: data.verifyToken,
                email: __data.email,
                name: __data.name
              })
            }
          }).catch(err => {
            res.status(500).json({
              message: err
            })
        })
      }).catch(err => {
      res.status(500).json({
        message: err
      })
    })
  })
};

userController.delete = (req, res) => {

};

export default userController;
