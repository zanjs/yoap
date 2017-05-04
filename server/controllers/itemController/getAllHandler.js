import { Types } from 'mongoose'
import { Item } from 'models'
import { formatItemsResponse } from 'utils'
import { statusTypes } from 'constants/itemConstants/statusTypes'

// todo: сделать верификацию если юзер фильтрует по статусам
export default (req, res) => {
  const { status, statuses, noStatus, ids } = req.body;
  let query = {
    status: status || statusTypes.types[1].id
  };

  if (ids) {
    query = {
      '_id': {
        $in: req.body.ids.map(item =>
          Types.ObjectId(item)
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

  Item.find(query)
    .then(data => {
      res.status(200).json(formatItemsResponse(data))
    })
    .catch(err => {
      res.status(500).json({
        message: err.toString()
      })
    })
};
