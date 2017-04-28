import { User } from 'models'

export default (req, res) => {
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
