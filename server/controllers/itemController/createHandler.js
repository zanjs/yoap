import { Item, User } from 'models'
import { createItemUrl, userModeratorValidation } from 'utils'
import { statusTypes } from 'constants/itemConstants/statusTypes'

export default (req, res) => {
  const {
    title, description,
    _creator, price, size, dewa,
    floors, location, category,
    type, params, rating,
    images, id, _id,
    status
  } = req.body;
  const objectId = (id || _id);
  const userId = (req.user.id || req.user._id);

  if (userModeratorValidation({objectId, req, res, _creator})) {
    return null;
  }

  if (objectId) {
    return Item
      .update({'_id': objectId}, {
        title, description,
        price, dewa, size, floors,
        type, category, rating,
        params, images, location,
        editedAt: Date.now(),
        status: req.user.isAdmin
          ? status : statusTypes.types[0].id
      })
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
    _creator
  });

  item.save().then(newItem => {
    console.log({
      _creator,
      id: newItem._id
    });

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
};
