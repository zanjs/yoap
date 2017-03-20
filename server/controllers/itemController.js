import cyrillicToTranslit from 'cyrillic-to-translit-js'
import randomNumber from 'helpers/app/randomNumber'
import testData from '../testItemsData.json'
import db from 'models'
const itemController = {};

itemController.post = (req, res) => {
  const {
    title, description,
    _creator, price, size,
    floors, location,
    images
  } = req.body;

  const link = cyrillicToTranslit()
    .transform(title + '-' + randomNumber(1000, 9999));

  const item = new db.Item({
    title, description,
    price, size,
    floors, location,
    link,
    //images,

    _creator
  });

  item.save().then(data => {
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

itemController.get = (req, res) => {
  res.status(200).json({
    success: true,
    data: testData
  })
};

export default itemController;
