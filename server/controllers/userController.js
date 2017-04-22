import db from 'models'
import { hashSync, compareSync } from 'bcrypt'
import { userValidation, createToken } from 'utils'

const userController = {};

userController.login = (req, res) => {
  const { email, phone, password } = req.body;
  const query = {
    ...(email ? {email} : {phone})
  };

  db.User.findOne(query)
    .then(user => {
      if (!user) {
        return res.status(404).json({
          message: 'Такого пользователя у нас нет!'
        })
      }
      // check password
      if (compareSync(password, user.password_digest)) {
        const token = createToken(user);

        return db.User.findOneAndUpdate(query, {token})
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
  if (!req.user) {
    return res.status(403).json({
      success: false
    })
  }

  return res.status(200).json({
    success: true
  })
};
userController.logout = (req, res) => {
  const { user } = req;
  const query = {_id: user.id || user._id};
  const update = {token: ''};
  db.User.findOneAndUpdate(query, update)
    .then(() => {
      res.status(200).json({success: true})
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
      const user = new db.User({
        name, phone, email,
        passwordDigest: hashSync(password, 10)
      });

      user.save().then(data => {
        res.status(200).json({
          success: true,
          data
        })
      }).catch(err => {
        res.status(500).json({
          message: err
        })
      })
    })
};

userController.update = (req, res) => {
  const { data, id } = req.body;

  console.log(data, id);

  db.User
    .findByIdAndUpdate(id, { $set: data }, { new: true })
    .then(data => {
      res.status(200).json({
        success: true,
        data
      })
    }).catch(err => {
    res.status(500).json({
      message: err
    })
  })
};

userController.delete = (req, res) => {

};

export default userController;
