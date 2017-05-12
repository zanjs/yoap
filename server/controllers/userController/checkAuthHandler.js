import { User } from 'models'
import { createToken } from 'utils'

export default (req, res) => {
  const { user } = req;
  if (!req.user) {
    return res.status(401).json({
      success: false
    })
  }

  const token = createToken(user);
  User.findOneAndUpdate({token: user.token, restore: false, restoreHash: ''}, {token})
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
