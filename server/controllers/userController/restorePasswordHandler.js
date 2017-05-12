import { User } from 'models'
import { createId, isEmpty } from 'utils'
import { appDomainName } from 'serverConfig'
import mail from 'mail'

const restore = (req, res) => {
  const { email } = req.body;

  if (isEmpty(email)) {
    return res.status(401).json({
      message: 'Вы не прислали почту, поэтому мы не сможем сменить ваш пароль. Обратитесь к администратору.'
    })
  }

  User.findOne({email})
    .then(user => {
      if (!user) {
        return res.status(404).json({
          message: 'Такого пользователя у нас нет!'
        })
      }

      const restoreHash = createId();

      const update = {
        restore: true,
        restoreHash
      };

      User.findByIdAndUpdate(user._id, update)
        .then(user => {
          mail.restorePassword({
            restoreHash,
            email: user.email,
            name: user.name
          })
          res.status(200).json({
            success: true,
            message: 'Мы выслали инструкцию вам на почту, удачи!'
          })
        })
    })
    .catch(err => {
      res.send(500).json({
        message: 'Произошла ошибка: ' + JSON.stringify(err)
      })
    })
}

const validate = (req, res) => {
  const { restoreHash } = req.params;
  const query = {restoreHash};

  if (isEmpty(restoreHash)) {
    return res.status(401).send(
      `<script>
        alert('Вы перешли по неправильной ссылке'); 
        location.href = '${appDomainName}/login'
       </script>`
    )
  }

  User.findOne(query)
    .then(user => {
      if (!user || !user.restore) {
        return res.status(404).send(
          `<script>
            alert('Ссылка либо устарела, либо вы уже восстанавливали по этой ссылке пароль.')
            location.href = '${appDomainName}/login'
          </script>`
        )
      }

      return res.redirect(`${appDomainName}/you/restore/${restoreHash}`)
    })
    .catch(err => {
      res.status(500).send(
        `<h1>Произошла ошибка 500</h1>
         <p>${JSON.stringify(err)}</p>`
      )
    })
};


export default {
  restore,
  validate
}
