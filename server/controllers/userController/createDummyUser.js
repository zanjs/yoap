import { User } from 'models'
import { hashSync } from 'bcrypt'
import {
  createId, userValidation,
  sendSignUpEmail
} from 'utils'
import getUsers from './getUsers'

export default (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(401).json({
      message: 'У вас недостаточно прав для регистрации других пользователей.'
    })
  }

  const { body } = req;
  let credentials = {
    name: body.name,
    phone: body.phone
  };

  if (body.password) {
    credentials.password = body.password;
  }
  if (body.email) {
    credentials.email = body.email;
  }

  userValidation(credentials, null, null, true).then(({isValid, errors}) => {
    if (!isValid) {
      return res.status(400).json({
        errors: {
          ...errors,
          formImport: true
        }
      })
    }

    // User model no need password field
    delete credentials.password;

    const verifyToken = createId();
    const user = new User({
      ...credentials,
      isDummy: true, verifyToken,
      password_digest: hashSync(createId(), 10),
    });

    user.save().then(() => {
      return getUsers().then(__data => {
        res.status(200).json({
          success: true,
          data: __data
        })
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
}
