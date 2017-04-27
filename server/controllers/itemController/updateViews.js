import { Item } from 'models'
import { isEmpty } from 'utils'
import { statusTypes } from 'constants/itemConstants/statusTypes'

export default (req, res) => {
  const validStatus = statusTypes.types[1].id;
  const { id, _id } = req.body;
  const objectId = (id || _id);

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
    statistics.push(new Date);

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