import { User } from 'models'
import { filterUserFields } from 'utils'

export default () => {
  return User.find({}).sort({createdAt: -1}).then(__users => {
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

    return {
      dummies: dummyUsers,
      users
    };
  })
}
