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
    required: true,
    minLength: [4, 'Пароль не может быть короче 4-ех символов']
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
  createdAt: {
    type: Date,
    default: Date.now
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
})

const User = mongoose.model('User', userSchema);

export default User;
