import { User } from 'models'
import { Types } from 'mongoose'
import { isValid } from 'validation/userValidation/tests'
import { compareSync } from 'bcrypt'
import isEmpty from 'helpers/app/isEmpty'

export default function userValidation(data, _id, update, dummyUser) {
  const {
    phone, email, password, password_new
  } = data;

  let toValidate = {
    ...data,
    password: password_new || password
  };

  if (dummyUser) {
    delete toValidate.password;
  }

  if (update) {
    if (!password) {
      delete toValidate.password;
    }
  }

  let errors = isValid(toValidate);

  // password validation
  if (update && password && !password_new || !password && password_new) {
    !password && (errors.password = 'Вы не ввели старый пароль.')
    !password_new && (errors.password_new = 'Вы не ввели новый пароль.')
  }

  const queryMatch = {$or: [{email}, {phone}]}
  const queryId = {_id: Types.ObjectId(_id)};

  if (update) {
    // find current user data
    return User.findOne(queryId).then(user => {
      if (isEmpty(user)) {
        const error = new Error(res);
        error.status = 404;
        throw error
      }
      return user;
    }).then(currentUser => {
      // find matched user by data
      return User.findOne(queryMatch).then(matchedUser => {
        return {currentUser, matchedUser};
      })
    }).then(({currentUser, matchedUser}) => {
      if (!matchedUser) {
        return currentUser;
      }
      // check if changed email and phone exist
      if (currentUser._id === matchedUser._id) {
        return currentUser;
      }
      if (matchedUser.email === email) {
        errors.email = 'Почта найдена в базе данных';
        errors.notUnique = true;
      }
      if (matchedUser.phone === phone) {
        errors.phone = 'Телефон найден в базе данных';
        errors.notUnique = true;
      }

      return currentUser;
    }).then(user => {
      if (password && password_new && !compareSync(password, user.password_digest)) {
        errors.password = 'Вы ввели неверный пароль'
      }
    }).then(() => {
      return {
        errors,
        isValid: isEmpty(errors)
      }
    }).catch(err => {
      if (err.status === 404) {
        return {isValid: false, status: 404};
      }

      return {isValid: false, status: 500, err}
    })
  }

  return User.findOne(queryMatch).then(user => {
    if (isEmpty(user))
      return null;

    if (user.email === email) {
      errors.email = 'Почта найдена в базе данных';
      errors.notUnique = true;
    }
    if (user.phone === phone) {
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
