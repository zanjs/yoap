import { User } from 'models'

const update = (user, date = new Date) => ({
  visits: [
    ...user.visits,
    date
  ],
  lastVisit: date
})

export default (id, user) => {
  if (user) {
    return update(user)
  }


  User.findById(id).then(user => {
    User.findByIdAndUpdate(id, update(user))
      .catch(err => {
        console.log(err);
      })
  })
}
