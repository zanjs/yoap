import { User } from 'models'
import { isValid } from 'validation/userValidation/tests'
import isEmpty from 'helpers/app/isEmpty'
import db from 'models'

export default function userValidation(data) {
  const {
    phone, email,
  } = data;
  let errors = isValid(data);

  return User.findOne({$or: [
    {email},
    {phone}
  ]}).then(__user => {
    let user = __user || {};
    if (user.email) {
      errors.email = 'Почта найдена в базе данных';
      errors.notUnique = true;
    }
    if (user.phone) {
      errors.phone = 'Телефон найден в базе данных';
      errors.notUnique = true;
    }
  }).then(() => {
    return {
      errors,
      isValid: isEmpty(errors)
    }
  })
}
