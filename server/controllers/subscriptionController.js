import { Subscription, User } from 'models'
import { createToken } from 'utils'
import isEmpty from 'helpers/app/isEmpty'
const notEmpty = d => d != null;

const createSubscription = (req, res) => {
  const {
    date, term, title, name, about,
    status, createdAt, sum, openedBalance,
    openAmountSum, paymentId, support
  } = req.body.data;

  const userId = (req.user.id || req.user._id);

  const sub = new Subscription({
    date, term, title, name, about,
    status, createdAt, sum, openedBalance,
    openAmountSum, paymentId, support,
    _creator: userId
  });

  sub.save().then(newItem => {
    User.findByIdAndUpdate(
      userId,
      { $push: { 'subscriptions': newItem._id } },
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

const updateSubscription = (req, res) => {
  const {
    status, openedBalance,
    openAmountSum, paymentId
  } = req.body;

  const userId = (req.user.id || req.user._id);
  let update = {};

  if (!notEmpty(userId))
    return res.status(403).json({message: 'Вы не авторизовались!'});

  if (notEmpty(status)) {
    update.status = status;
  }
  if (notEmpty(openedBalance)) {
    update.openedBalance = openedBalance;
  }
  if (notEmpty(openAmountSum)) {
    update.openAmountSum = openAmountSum;
  }

  const query = {paymentId};

  if (isEmpty(query.paymentId) || isEmpty(update)) {
    return res.send(400).json({message: 'Невозможно обновить подписку'})
  }

  Subscription.findOneAndUpdate(query, update).then(() => {
    return Subscription.findOne(query)
  }).then(data => {
    res.status(200).json({
      success: true,
      data
    })
  }).catch(err => {
    res.status(500).json({
      success: false,
      message: err
    })
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
    const subs = user.subscription;

    if (!subs || !subs.length) {
      return [];
    }

    return Subscription.find({_id: {$in: subs}})
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

export default { createSubscription, getAllHandler, updateSubscription }
