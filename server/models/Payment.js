import mongoose from 'mongoose'
const { Schema } = mongoose;
import {
  PAYMENT_PENDING_STATUS,
} from 'constants/paymentConstants'
import { paymentReceiver } from 'config'

mongoose.Promise = global.Promise;

const paymentSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  sum: {
    type: Number,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  operation_id: {
    type: String,
    required: false
  },
  amount: {
    type: String,
    required: false
  },

  sender: {
    type: String,
    required: false
  },
  withdraw_amount: {
    type: String,
    required: false
  },

  title: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: PAYMENT_PENDING_STATUS
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  _creator: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  user: {
    email: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    _id: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true
    }
  },
  paymentType: {
    type: String,
    required: true
  },
  receiver: {
    type: Number,
    required: true,
    default: paymentReceiver
  },
  target: {
    type: String,
    required: true
  },
  targets: {
    type: String,
    required: true
  }
});

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
