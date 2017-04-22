import mongoose from 'mongoose'
const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: [2, 'Имя должно быть не менее двух символов']
  },
  password: {
    type: String,
  },
  passwordDigest: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    minLength: [4, 'Номер телефона не может быть короче 4-ех символов'],
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    default: ''
  },
  verified: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  objects: [
    {
      type: Schema.ObjectId,
      ref: 'Item'
    }
  ],
  featured: [
    {
      type: Schema.ObjectId,
      ref: 'Item'
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  editedAt: {
    type: Date,
    default: Date.now
  },
  lastVisit: {
    type: Date,
    default: Date.now,
    duration: {
      type: Number,
      default: 1
    }
  },
  visits: [
    {
      date: {
        type: Date,
        default: Date.now,
      },
      duration: {
        type: Number,
        default: 1
      }
    }
  ],
  isDeleted: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.model('User', userSchema);

export default User;
