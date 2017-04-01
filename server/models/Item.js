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
  rating: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: [
    {
      id: String,
      value: Number,
      deposit: Number,
    }
  ],
  size: {
    rooms: Number,
    bedrooms: Number,
    bathrooms: Number,
    beds: Number,

    squares: Number
  },
  floors: [Number, Number],
  location: {
    address: String,
    location: [Number, Number],
    subway: [
      {
        distance: String,
        duration: String,
        name: String,
        position: [Number, Number],
        id: String
      }
    ],
    timing: [
      {
        distance: String,
        duration: String,
        name: String,
        type: {
          type: String
        },
        position: [Number, Number],
      }
    ]
  },
  params: [String],
  views: {
    type: Number,
    default: 0
  },

  isDeleted: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  editedAt: {
    type: Date,
    default: Date.now
  },
  _creator: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  // images: {
  //   thumbnail: {
  //     preview: String,
  //     full: String
  //   },
  //   gallery: [String]
  // },

});

const populate = function(next) {
  this.populate({
    path: '_creator',
    select: 'name image _id'
  });

  next();
};

itemSchema.pre('find', populate);
itemSchema.pre('findOne', populate);

const Item = mongoose.model('Item', itemSchema);
export default Item;
