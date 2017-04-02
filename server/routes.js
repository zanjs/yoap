import express from 'express'
import {
  userController, itemController, imageController,
} from 'controllers'
import {
  signup, login, items,
  item, image, itemFind
} from 'constants/urls'

const routes = express();


// User routes
routes.post(
  signup,
  //bodyParser.urlencoded({ extended: true }), bodyParser.json(),

  userController.signup
);
routes.post(
  login,
  //bodyParser.urlencoded({ extended: true }), bodyParser.json(),

  userController.login
);

// Item routes
routes.post(
  item,
  //bodyParser.urlencoded({ extended: true }), bodyParser.json(),

  itemController.itemHandler
);
routes.post(
  itemFind,
  //bodyParser.urlencoded({ extended: true }), bodyParser.json(),

  itemController.getOne
);

// Items routes
routes.post(
  items,
  //bodyParser.urlencoded({ extended: true }), bodyParser.json(),

  itemController.getAll
);

// Image routes
routes.post(image, imageController.upload);

export default routes;
