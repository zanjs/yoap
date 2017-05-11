import { User } from 'models'
import jwt from 'jsonwebtoken'
import { jwtSecret } from 'serverConfig'
import { authHeader } from 'constants/urls'

export default function authenticate(req, res, next) {
  const token = req.headers[authHeader] || req.headers[authHeader.toLowerCase()];

  if (token) {
    return jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: 'У вас нет прав. ' +
          'Зайдите в систему снова или обратитесь к администратору.'
        });
      }

      User.findById((decoded.id || decoded._id))
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

  return res.status(401).json({
    message: 'У вас нет прав. Обратитесь к администратору.'
  });
}
