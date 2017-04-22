import db from 'models'
import jwt from 'jsonwebtoken'
import { jwtSecret } from 'serverConfig'

export default function authenticate(req, res, next) {
  const token = req.headers['X-AUTH'] || req.headers['x-auth'];
  console.log('token', token);

  if (token) {
    return jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          message: 'У вас нет прав. ' +
          'Зайдите в систему снова или обратитесь к администратору.'
        });
      }

      db.User.findOne({token})
        .then(user => {
          if (!user) {
            return res.status(404).json({
              message: 'Пользователь либо вышел, либо был удален.'
            });
          }

          req.user = user;

          next();
        })
        .catch(err => {
          res.status(404).json({
            message: err
          });
        })
    })
  }

  return res.status(403).json({
    message: 'У вас нет прав. Обратитесь к администратору.'
  });
}
