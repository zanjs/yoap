import { Item } from 'models'
import { isEmpty } from 'utils'
import { statusTypes } from 'constants/itemConstants/statusTypes'
import { OBJECT_VIEW } from 'constants/itemConstants/views'

export default (req, res) => {
  const validStatus = statusTypes.types[1].id;
  const { id, _id } = req.body;
  const objectId = (id || _id);
  const userId = req.user && (req.user._id || req.user.id);

  if (isEmpty(objectId)) {
    return res.status(404).json({
      message: `Такого объекта ${objectId} не существует.`
    })
  }

  Item.findById(objectId).then(item => {
    if (item.status !== validStatus) {
      return res.status(403).json({
        message: 'Вы не можете обновить счетчик просмотров у неопубликованного объявления.'
      })
    }

    let views = item.views + 1;
    let statistics = item.statistics || [];

    statistics.push({
      date: new Date,
      type: OBJECT_VIEW,
      _creator: userId
    });

    Item.findByIdAndUpdate(id, { $set: {views, statistics} }, { new: true })
      .then(updatedItem => {
        res.status(200).json({
          success: true,
          data: [updatedItem]
        })
      })
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
}
