import mongoose from 'mongoose'
import { createItemUrl } from 'utils'
import testData from '../testItemsData.json'
import db from 'models'
import { statusTypes } from 'constants/itemConstants/statusTypes'
const itemController = {};

itemController.itemHandler = (req, res) => {
  const {
    title, description,
    _creator, price, size, dewa,
    floors, location, category,
    type, params, rating,
    images, id, _id
  } = req.body;

  if (id || _id) {
    db.Item
      .update({'_id': id || _id}, {
        title, description,
        price, dewa, size, floors,
        type, category, rating,
        params, images, location
      })
      .then(updatedData => {
        res.status(200).json({
          success: true,
          data: updatedData
        })
      }).catch(err => {
        res.status(500).json({
          message: err.toString()
        })
    });

    return;
  }


  const link = createItemUrl({
    title, category, size
  });

  const item = new db.Item({
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

    db.User.findByIdAndUpdate(
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
        message: err.toString()
      })
    });
  }).catch(err => {
    res.status(500).json({
      message: err.toString()
    })
  })
};

itemController.getOne = (req, res) => {
  let query;
  const { id, _id, link, _link } = req.body;

  if (id || _id) {
    query = {
      _id: id || _id
    };
  }

  if (!query && (link || _link)) {
    query = {
      link: link || _link
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
  const { status, statuses, noStatus, ids } = req.body;
  let query = {
    status: status || statusTypes.types[1].id
  };

  if (ids) {
    query = {
      '_id': {
        $in: req.body.ids.map(item =>
          mongoose.Types.ObjectId(item)
        )
      },
      ...query
    };
  }

  if (statuses) {
    query = {
      ...query,
      status: { $in: statuses },
    };
  }

  if (noStatus) {
    delete query.status;
  }

  db.Item.find(query)
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
