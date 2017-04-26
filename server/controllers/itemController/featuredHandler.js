import { User, Item } from 'models'

export default (req, res) => {
  const { id, user } = req.body;
  const userId = (req.user.id || req.user._id);
  console.log({userId, authUser: user})

  if (userId !== user) {
    return res.status(401).json({
      message: 'Зарегистрируйтесь или войдите ' +
      'чтобы добавлять объекты в избранное.',
      data: {
        userId, user,
        cond: userId !== user
      }
    })
  }

  if (!id) {
    return res.status(403).json({
      message: 'Невозможно добавить в избранное объект ' +
      'не предоставив object id'
    })
  }

  const query = {_id: user};

  const updateFeaturedCount = ({id, increase}, cb) => {
    const _query = {_id: id};
    Item.findOne(_query)
      .then(item => {
        let featured;

        if (increase) {
          if (item.featured) {
            featured = item.featured + 1;
          } else {
            featured = 1;
          }
        } else {
          if (item.featured) {
            featured = item.featured <= 1 ? 0 : item.featured - 1;
          } else {
            featured = 0;
          }
        }

        console.log('featured updated to', featured);

        Item.findOneAndUpdate(_query, {featured})
          .then(cb)
          .catch(err => {
            res.status(500).json({
              message: err
            })
          })
      }).catch(err => {
      res.status(500).json({
        message: err
      })
    })
  };
  const update = (data, item) => {
    return updateFeaturedCount(item, () => {
      User.findOneAndUpdate(query, {featured: data})
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
    })
  };

  User.findOne(query)
    .then(item => {
      if (item && item.featured) {
        const { featured } = item;
        const objId = mongoose.Types.ObjectId(id);
        const isExist = !!(featured && featured.length && featured.find(
          fav => objId.toString() === fav.toString()
        ));

        if (isExist) {
          return update(featured.filter(fav =>
            fav.toString() !== objId.toString()
          ), {
            id: objId,
            increase: false
          });
        }

        return update([...featured, objId], {
          id: objId,
          increase: true
        });
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
