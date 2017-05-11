import { User } from 'models'
import jwt from 'jsonwebtoken'
import { jwtSecret } from 'serverConfig'
import { authHeader } from 'constants/urls'

export default function findUserByToken(req, res, next) {
  const token = req.headers[authHeader] || req.headers[authHeader.toLowerCase()];

  if (token) {
    return jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        return next();
      }

      User.findById((decoded.id || decoded._id))
        .then(user => {
          req.user = user;

          next();
        })
        .catch(err => {
          console.log('error on finding the user', err);

          next();
        })
    })
  }

  next();
}
