import { User } from 'models'
import { createToken } from 'utils'
import { compareSync } from 'bcrypt'

export default (req, res) => {
  const { email, phone, password } = req.body;
  const query = {
    ...(email ? {email} : {phone})
  };

  User.findOne(query)
    .then(user => {
      if (!user) {
        return res.status(404).json({
          message: 'Такого пользователя у нас нет!'
        })
      }
      // check password
      if (compareSync(password, user.password_digest)) {
        const token = createToken(user);

        return User.findOneAndUpdate(query, {token})
          .then(() => {
            return res.status(200).json({
              success: true,
              data: {token}
            })
          })
          .catch(err => {
            return res.status(500).json({
              message: err
            })
          })
      }

      return res.status(401).json({
        message: 'Неправильный пароль.',
        errors: {
          password: 'Вы ввели неправильный пароль.'
        }
      })
    })
    .catch(err => {
      return res.status(500).json({
        message: err
      })
    })
};
