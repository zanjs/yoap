import { User } from 'models'
import { filterUserFields } from 'utils'

export default (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(401).json({
      message: 'У вас недостаточно прав, чтобы получить данные пользователей.'
    })
  }

  User.find({}).then(__users => {
    let dummyUsers = [];
    let users = [];
    __users.forEach(item => {
      if (item.isDummy) {
        return dummyUsers.push(
          filterUserFields(item)
        );
      }

      return users.push(
        filterUserFields(item)
      );
    })

    return res.status(200).json({
      data: {
        dummies: dummyUsers,
        users
      }
    })
  }).catch(err => {
    res.status(500).json({
      message: err
    })
  })
}
