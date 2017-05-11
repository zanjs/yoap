import mongoose from 'mongoose'
import { statusTypes } from 'constants/itemConstants/statusTypes'
const { Schema } = mongoose;

mongoose.Promise = global.Promise;
export const imageSchema = required => ({
  preview: {
    type: String,
    required
  },
  full: {
    type: String,
    required
  },
  mobile: String,
  tablet: String,
  laptop: String,
  desktop: String,
  retina: String
});

const itemSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Без заголовка никак!'],
    minLength: [5, 'Заголовок не может быть меньше 5-ти символов']
  },
  order: {
    type: Number,
    unique: true
  },
  link: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  featured: {
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
  status: {
    type: String,
    default: statusTypes.types[0].id
  },
  justCreated: {
    type: Boolean,
    default: true
  },
  description: {
    type: String,
    required: true
  },
  images: {
    thumbnail: imageSchema(true),
    gallery: [imageSchema(true)]
  },
  price: [
    {
      id: String,
      value: Number,
      deposit: Number,
    }
  ],
  dewa: {
    type: Number,
    default: 0
  },
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
  phoneViews: {
    type: Number,
    default: 0
  },

  statistics: [
    {
      type: {
        type: String,
        default: 'OBJECT_VIEW'
      },
      date: Date
    }
  ],

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
});

const populate = function(next) {
  this.populate({
    path: '_creator',
    select: 'name image _id verified'
  });

  next();
};

itemSchema.pre('find', populate);
itemSchema.pre('findOne', populate);

const Item = mongoose.model('Item', itemSchema);
export default Item;
