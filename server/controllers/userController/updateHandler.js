import { User } from 'models'
import {
  userValidation, createToken,
  sendSignUpEmail, createId,
  isEmpty
} from 'utils'

export default (req, res) => {
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
