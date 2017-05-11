import { User } from 'models'
import jwt from 'jsonwebtoken'
import { jwtSecret } from 'serverConfig'
import { authHeader } from 'constants/urls'
import { updateUserVisits } from 'utils'

export default function findUserByToken(req, res, next) {
  const token = req.headers[authHeader] || req.headers[authHeader.toLowerCase()];

  if (token) {
    return jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        return next();
      }
      const userId = (decoded.id || decoded._id);
      User.findById(userId)
        .then(user => {
          req.user = user;
          updateUserVisits(userId);

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
