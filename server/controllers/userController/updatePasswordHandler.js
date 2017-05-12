import { User } from 'models'
import { isEmpty, createToken } from 'utils'
import { hashSync, compareSync } from 'bcrypt'

export default (req, res) => {
  const { password, id } = req.body;

  if (isEmpty(id)) {
    return res.status(401).json({
      message: 'Вы не прислали свой идентификатор, поэтому мы не сможем сменить ваш пароль. Обратитесь к администратору.'
    })
  }

  User.findOne({restoreHash: id}).then(user => {
    if (!user) {
      return res.status(404).json({
        message: 'Ваша ссылка восстановления пароля устарела или пользователь был удален.'
      })
    }

    if (compareSync(password, user.password_digest)) {
      return res.status(400).json({
        message: 'Введите новый пароль, старый более не актуален'
      })
    }

    const token = createToken(user);
    const update = {
      password_digest: hashSync(password, 10),
      restoreHash: '', restore: false,
      token
    };

    User.findByIdAndUpdate(user._id, update).then(() => {
      res.status(200).json({
        success: true,
        data: {token}
      })
    }).catch(err => {
      res.status(500).json({
        message: err.message || JSON.stringify(err)
      })
    })
  }).catch(err => {
    res.status(500).json({
      message: err.message || JSON.stringify(err)
    })
  })
}
