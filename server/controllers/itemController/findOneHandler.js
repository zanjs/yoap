import { Item } from 'models'

export default (req, res) => {
  let query;
  const { id, _id, link, _link } = req.body;

  if (id || _id) {
    query = {
      _id: id || _id
    };
  }

  if (!query && (link || _link)) {
    query = {
      link: _link || link
    };
  }

  if (!query) {
    return res.status(500).json({
      message:
        'Невозможно найти объект не предоставив id/_id или link'
    })
  }

  Item.findOne(query)
    .then(data => {
      res.status(200).json({
        success: true,
        data: [data]
      })
    })
    .catch(err => {
      res.status(500).json({
        message: err
      })
    })
};
