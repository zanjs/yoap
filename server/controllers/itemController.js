import { createItemUrl } from 'utils'
import testData from '../testItemsData.json'
import db from 'models'
const itemController = {};

itemController.itemHandler = (req, res) => {
  const {
    title, description,
    _creator, price, size,
    floors, location, category,
    type, params, rating,
    images
  } = req.body;

  const link = createItemUrl({
    title, category, size
  });

  const item = new db.Item({
    title, description,
    category, type,
    price, size,
    floors, location,
    params,
    link, rating,
    _creator
  });

  item.save().then(newItem => {
    console.log({
      _creator,
      id: newItem._id
    });

    db.User.findByIdAndUpdate(
      _creator,
      { $push: { 'objects': newItem._id } },
      { 'new': true }
    ).then(existingPost => {
      res.status(200).json({
        success: true,
        existingPost,
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

itemController.getOne = (req, res) => {
  let query;
  const { id, _id, link } = req.body;

  if (id || _id) {
    query = {
      _id: id || _id
    };
  }

  if (!query && link) {
    query = {
      link
    };
  }

  if (!query) {
    res.status(500).json({
      message:
        'Невозможно найти объект не предоставив id/_id или link'
    })
  } else {
    db.Item.find(query)
      .then(data => {
        res.status(200).json({
          success: true,
          data
        })
      })
      .catch(err => {
        res.status(500).json({
          message: err
        })
      })
  }
};
itemController.getAll = (req, res) => {
  db.Item.find({})
    .then(data => {
      res.status(200).json({
        success: true,
        data
      })
    })
    .catch(err => {
      res.status(500).json({
        message: err.toString()
      })
    })
};

export default itemController;
