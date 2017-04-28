import { User } from 'models'
import { appDomainName } from 'serverConfig'

export default (req, res) => {
  const token = req.params.token;
  const query = {verifyToken: token};

  User.findOne(query)
    .then(user => {
      if (!user) {
        return res.send(
          `<script>alert('Ваша ссылка устарела и аккаунт не был подтвержден!')</script>`
        )
      }
      if (!user._id || user.verified || user.banned) {
        if (user.banned) {
          return res.send(
            `<script>alert('Нас не проведешь - мы знаем что вы агент!')</script>`
          )
        }
        if (user.verified) {
          return res.redirect(`${appDomainName}/you`)
        }
      }

      return User.findOneAndUpdate(query, {
        verifyToken: '',
        verified: true
      }).then(() => {
        res.redirect(`${appDomainName}/you`)
      }).catch(err => {
        res.status(500).send(
          `<h1>Произошла ошибка 500</h1>
           <p>${err.toString()}</p>`
        )
      })
    })
    .catch(err => {
      res.status(500).send(
        `<h1>Произошла ошибка 500</h1>
         <p>${err.toString()}</p>`
      )
    })
};
