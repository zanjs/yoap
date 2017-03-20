import mongoose from 'mongoose'
const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const itemSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Без заголовка никак!'],
    minLength: [5, 'Заголовок не может быть меньше 5-ти символов']
  },
  link: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  _creator: {
    type: Schema.ObjectId,
    ref: 'User'
  },

  price: [
    {
      name: String,
      id: String,
      value: Number
    }
  ],
  size: {
    rooms: Number,
    bedrooms: Number,
    bathrooms: Number,

    squares: Number
  },
  floors: [Number, Number],
  location: {
    address: {
      name: String,
      point: [Number, Number]
    },
    subway: [
      {
        name: String,
        distance: Number,
        timing: Number
      }
    ]
  },
  images: {
    thumbnail: {
      preview: String,
      full: String
    },
    gallery: [String]
  },

})

const Item = mongoose.model('Item', itemSchema);
export default Item;
