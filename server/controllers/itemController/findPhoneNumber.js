import { Item, User } from 'models'
import jwt from 'jsonwebtoken'
import { jwtSecret } from 'serverConfig'
import { PHONE_VIEW } from 'constants/itemConstants/views'

export default (req, res) => {
  if (!req.user || !req.user._id) {
    return res.status(401).json({
      message: 'Произошла ошибка, войдите в систему еще раз.'
    })
  }
  if (!req.user.verified) {
    return res.status(401).json({
      message: 'Вы не подтвердили свой аккаунт. \n' +
        'Проверьте вашу почту, выслали вам письмо с подтверждением.' +
        'Если письмо не пришло, вы можете отправить его снова в личном кабинете.'
    })
  }

  const { id, _id } = req.body;
  const objectId = id || _id;
  const authorId = req.user._id || req.user.id;

  Item.findById(objectId)
    .then(item => {
      if (!item || !item._id || !item._creator) {
        return res.status(404).json({
          message: 'Такого объекта не существует'
        })
      }

      const userId = item._creator;
      User.findById(userId).then(user => {
        if (!user || !user._id) {
          return res.status(404).json({
            message: 'Хозяин квартиры был удален или заблокирован.'
          })
        }

        // update item phone view statistics
        Item.findByIdAndUpdate(objectId, {
          phoneViews: (item.phoneViews || 0) + 1,
          statistics: [
            ...item.statistics,
            {
              type: PHONE_VIEW,
              date: new Date,
              _creator: authorId
            }
          ]
        }).then(() => {
          return res.status(200).json({
            data: jwt.sign({phone: user.phone}, jwtSecret)
          });
        })
      }).catch(err => {
        return res.status(500).json({
          message: err
        })
      })
    })
    .catch(err => {
      return res.status(500).json({
        message: err
      })
    })
}
