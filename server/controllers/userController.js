import db from 'models'

const userController = {};

userController.login = (req, res) => {
  const { email, phone, password } = req.body;
  const query = {
    ...(email ? {email} : {phone}),
    password
  };

  console.log(query);


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


  // Validation
  const user = new db.User({
    name, phone, email, password
  });

  console.log('user', user);

  user.save().then(data => {
    res.status(200).json({
      success: true,
      data
    })
  }).catch(err => {
    res.status(500).json({
      message: err.toString()
    })
  })
};

userController.update = (req, res) => {

};

userController.delete = (req, res) => {

};

export default userController;
