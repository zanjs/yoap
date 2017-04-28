import { User } from 'models'
import { hashSync } from 'bcrypt'
import {
  userValidation, createToken,
  sendSignUpEmail, createId
} from 'utils'

export default (req, res) => {
  const {
    name, phone, email,
    password
  } = req.body;

  userValidation({name, phone, email, password})
    .then(({isValid, errors}) => {
      if (!isValid) {
        return res.status(400).json({
          errors: {
            ...errors,
            formImport: true
          }
        })
      }

      // Validation
      const verifyToken = createId();
      const user = new User({
        name, phone, email,
        password_digest: hashSync(password, 10),
        verifyToken
      });

      user.save().then(data => {
        const token = createToken(data);
        return User.findByIdAndUpdate((data.id || data._id), {token})
          .then(() => {
            res.status(200).json({
              success: true,
              data: {token}
            })
            sendSignUpEmail({
              id: verifyToken,
              email,
              name
            })
          })
          .catch(err => {
            res.status(500).json({
              message: err
            })
          })
      }).catch(err => {
        res.status(500).json({
          message: err
        })
      })
    })
};
