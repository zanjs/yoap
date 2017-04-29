import { User } from 'models'
import { userValidation } from 'utils'
import getUsers from './getUsers'

export default (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(401).json({
      message: 'У вас недостаточно прав, чтобы изменить данные пользователя.'
    })
  }

  const { data, id } = req.body;

  userValidation(data, id, true).then(({isValid, status, err, errors}) => {
    // validation
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

    data.editedAt = new Date();

    User
      .findByIdAndUpdate(id, { $set: data }, { new: true })
      .then(() => {
        getUsers().then(__data => {
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
