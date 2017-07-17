import mongoose from 'mongoose'
const { Schema } = mongoose;
import {
  SUBSCRIPTION_PENDING_STATUS,
} from 'constants/subscribtionConstants'

mongoose.Promise = global.Promise;

const subscriptionModel = new Schema({
  term: {
    type: Number,
    required: true
  },

  title: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  about: {
    type: String,
    required: true
  },

  status: {
    type: String,
    default: SUBSCRIPTION_PENDING_STATUS
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  date: {
    type: Date,
    default: Date.now
  },
  _creator: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },

  sum: {
    type: Number,
    required: true
  },
  openedBalance: {
    type: Number,
    required: true
  },
  openAmountSum: {
    type: Number,
    required: true
  },
  paymentId: {
    type: Schema.ObjectId,
    ref: 'Payment',
    required: true
  },

  support: {
    type: Schema.Types.Mixed
  },
});

const Subscription = mongoose.model('Subscription', subscriptionModel);

export default Subscription;
