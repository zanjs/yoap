import db from 'models'
import { hashSync } from 'bcrypt'
import { userValidation } from 'utils'

const userController = {};

userController.login = (req, res) => {
  const { email, phone, password } = req.body;
  const query = {
    ...(email ? {email} : {phone}),
    password
  };

  db.User.findOne(query, (err, data) => {
    if (err) {
      return res.status(500).json({
        message: err
      })
    }
    if (!data) {
      return res.status(404).json({
        message: 'Неправильная почта/телефон или пароль'
      })
    }

    return res.status(200).json({
      success: true,
      data
    })
  })
};

userController.signup = (req, res) => {
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
      const user = new db.User({
        name, phone, email,
        passwordDigest: hashSync(password, 10)
      });

      user.save().then(data => {
        res.status(200).json({
          success: true,
          data
        })
      }).catch(err => {
        res.status(500).json({
          message: err
        })
      })
    })
};

userController.update = (req, res) => {
  const { data, id } = req.body;

  console.log(data, id);

  db.User
    .findByIdAndUpdate(id, { $set: data }, { new: true })
    .then(data => {
      res.status(200).json({
        success: true,
        data
      })
    }).catch(err => {
    res.status(500).json({
      message: err
    })
  })
};

userController.delete = (req, res) => {

};

export default userController;
