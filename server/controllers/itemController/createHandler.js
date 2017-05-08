import { Item, User } from 'models'
import {
  createItemUrl, userModeratorValidation,
  getMaxItemOrder, filterObject
} from 'utils'
import { statusTypes } from 'constants/itemConstants/statusTypes'

const validate = data => (
  userModeratorValidation(data)
)
const notAuthorized = (req, res) => res.status(401).json({
  message: 'У вас недостаточно прав для создания/редактирования объявлений'
});

const Update = (req, res) => {
  const {
    title, description,
    _creator, price, size, dewa,
    floors, location, category,
    type, params, rating,
    images, objectId,
    status
  } = req.body;

  let toUpdate = filterObject({
    title, description,
    price, dewa, size, floors,
    type, category, rating,
    params, images, location,
    editedAt: Date.now(),
    status: req.user.isAdmin
      ? status : statusTypes.types[0].id
  });

  Item
    .findByIdAndUpdate(objectId, toUpdate)
    .then(updatedData => {
      res.status(200).json({
        success: true,
        data: updatedData
      })
    }).catch(err => {
      res.status(500).json({
        message: err
      })
    });
}
const Create = (req, res) => {
  const {
    title, description,
    _creator, price, size, dewa,
    floors, location, category,
    type, params, rating,
    images, objectId,
    status
  } = req.body;
  const userId = (req.user.id || req.user._id);

  return getMaxItemOrder().then(order => {
    console.log('WILL BE CREATED NEW OBJECT WITH ORDER', order);
    const link = createItemUrl({
      title, category, size
    });

    const item = new Item({
      title, description,
      category, type,
      price, size, dewa,
      floors, location,
      params, images,
      link, rating,
      order: order + 1,
      _creator
    });

    item.save().then(newItem => {
      User.findByIdAndUpdate(
        _creator,
        { $push: { 'objects': newItem._id } },
        { 'new': true }
      ).then(user => {
        res.status(200).json({
          success: true,
          user,
          data: newItem
        })
      }).catch(err => {
        res.status(500).json({
          message: err
        })
      });
    }).catch(err => {
      res.status(500).json({
        message: err
      })
    })
  })
}

export default (req, res) => {
  const {
    id, _id, _creator
  } = req.body;

  const objectId = (id || _id);
  req.body.objectId = objectId;

  const isValid = validate({objectId, req, res, _creator, noRes: true});
  if (!isValid) {
    return notAuthorized(req, res);
  }

  // just for security reasons
  if (objectId) {
    return Update(req, res);
  }

  return Create(req, res);
};
