import { Payment, User } from 'models'
import { createToken } from 'utils'

const createPayment = (req, res) => {
  const {
    id, date, title,
    status, paymentType, target,
    targets, sum
  } = req.body.data;

  const userId = (req.user.id || req.user._id);

  const payment = new Payment({
    id, date, title, sum,
    status, paymentType, target,
    targets, _creator: userId
  });

  payment.save().then(newItem => {
    User.findByIdAndUpdate(
      userId,
      { $push: { 'payments': newItem._id } },
      { 'new': true }
    ).then(user => {
      const token = createToken(user);
      return User.findByIdAndUpdate(userId, {token}, { 'new': true });
    }).then(user => {
      res.status(200).json({
        success: true,
        user: {token: user.token},
        data: newItem
      })
    }).catch(err => {
      res.status(500).json({
        message: err.toString()
      })
    });
  }).catch(err => {
    res.status(500).json({
      message: err.toString()
    })
  })
};

const handlePayment = (req, res) => {
  const {
    operation_id,
    amount, withdraw_amount,
    datetime, sender,
    label
  } = req.body;

  const query = {id: label};
  const update = {
    date: datetime,
    operation_id, withdraw_amount,
    amount, sender
  };

  Payment.findOneAndUpdate(query, update).then(() => {
    res.redirect(200, '/');
  }).catch(err => {
    res.send(`Произошла ошибка: ${err}`);
  })
};

const getAllHandler = (req, res) => {
  const userId = (req.user.id || req.user._id);

  if (!userId) {
    return res.send(403).json({
      message: "Вы не авторизовались!"
    })
  }

  User.findById(userId).then(user => {
    const payments = user.payments;

    if (!payments || !payments.length) {
      return []
    }

    return Payment.find({_id: {$in: payments}})
  }).then(data => {
    res.status(200).json({
      success: true, data
    })
  }).catch(err => {
    res.status(500).json({
      message: err.toString()
    })
  })
};

export default { createPayment, getAllHandler, handlePayment }
