import { User } from 'models'
import { createId } from 'utils'
import mail from 'mail'

export default (req, res) => {
  const { user } = req;
  const userId = user._id || user.id;

  const verifyToken = createId();

  User.findByIdAndUpdate(userId, {verifyToken, verified: false})
    .then(() => {
      mail.verify({
        id: verifyToken,
        email: user.email,
        name: user.name
      })

      res.status(200).json({
        success: true,
        message: 'Повторное письмо было успешно отправлено!'
      })
    })
    .catch(err => {
      res.status(500).json({
        message: err.message || JSON.stringify(err)
      })
    })
};
