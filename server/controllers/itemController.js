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
    return db.Item
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
    return res.status(500).json({
      message:
        'Невозможно найти объект не предоставив id/_id или link'
    })
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
        message: err
      })
    })
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

itemController.update = (req, res) => {
  let query;
  const { id, _id, link, _link, update } = req.body;

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

  console.log(query, req.body);

  if (!query) {
    return res.status(500).json({
      message:
        'Невозможно изменить объект не предоставив id/_id или link/_link'
    })
  }

  db.Item.findOneAndUpdate(query, update)
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
};
itemController.featured = (req, res) => {
  const { id, user } = req.body;

  if (!id || !user) {
    return res.status(500).json({
      message: 'Невозможно добавить в избранное объект ' +
                'не предоставив object id и user id.'
    })
  }

  const query = {_id: user};

  const update = data => {
    return db.User.findOneAndUpdate(query, {featured: data})
      .then(data => {
        res.status(200).json({
          success: true,
          data
        })
    }).catch(err => {
      res.status(500).json({
        message: err
      })
    })
  };
  db.User.findOne(query)
    .then(item => {
      if (item && item.featured) {
        const { featured } = item;
        const objId = mongoose.Types.ObjectId(id);
        const isExist = !!(featured && featured.length && featured.find(
          fav => objId.toString() === fav.toString()
        ));

        if (isExist) {
          return update(
            featured.filter(fav => fav.toString() !== objId.toString())
          );
        }

        return update([...featured, objId]);
      }

      res.status(500).json({
        message: 'Такого юзера нет!',
        data: item
      })
    })
    .catch(err => {
      res.status(500).json({
        message: err
      })
    })

};

export default itemController;
