import { User } from 'models'

export default id => {
  User.findById(id)
}
