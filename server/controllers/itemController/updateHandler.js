import { Item } from 'models'
import { userModeratorValidation, filterObject } from 'utils'
import { statusTypes } from 'constants/itemConstants/statusTypes'

export default (req, res) => {
  let query;
  let {
    id, _id, link,
    _link, update,
    _creator
  } = req.body;
  const objectId = id || _id;
  const isAdmin = req.user.isAdmin;

  // filters
  update = filterObject(update);
  if (!userModeratorValidation({objectId, _creator, req, res})) {
    return null;
  }

  if (objectId) {
    query = {
      _id: objectId
    };
  }

  if (!query && (link || _link)) {
    query = {
      link: link || _link
    };
  }

  update = {
    ...update,
    editedAt: Date.now()
  };

  if (!query || !update) {
    return res.status(500).json({
      message: update
        ? 'Вы не предоставили объект обновления'
        : 'Невозможно изменить объект не предоставив id/_id или link/_link'
    })
  }

  if (update.status && !isAdmin) {
    update.status = statusTypes.types[0].id;
  }
  if (update.rating && !isAdmin) {
    delete update.rating;
  }
  if (update.statistics) {
    delete update.statistics;
  }
  if (update.views) {
    delete update.views;
  }

  if (update.status && update.status === statusTypes.types[1].id) {
    update.justCreated = false;
  }

  delete update.id;
  delete update._id;

  console.log('status to update', update.status, objectId);

  Item.findByIdAndUpdate(objectId, { $set: update }, { new: true })
    .then(data => {
      console.log('updated object', data._id, 'but id was', objectId, objectId === data._id)
      console.log('status updated to', data.status)
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
