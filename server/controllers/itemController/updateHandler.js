import { Item } from 'models'
import { userModeratorValidation } from 'utils'
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

  if (userModeratorValidation({objectId, _creator, req, res})) {
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

  if (update.status && update.status === statusTypes.types[1].id) {
    update.justCreated = false;
  }

  Item.findOneAndUpdate(query, update)
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
