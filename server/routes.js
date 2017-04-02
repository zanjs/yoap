import express from 'express'
import {
  userController, itemController, imageController,
} from 'controllers'
import {
  signup, login, items,
  item, image, itemFind,
  itemUpdate
} from 'constants/urls'

const routes = express();


// User routes
routes.post(
  signup,

  userController.signup
);
routes.post(
  login,

  userController.login
);

// Item routes
routes.post(
  item,

  itemController.itemHandler
);
routes.post(
  itemFind,

  itemController.getOne
);
routes.post(
  itemUpdate,

  itemController.update
);

// Items routes
routes.post(
  items,

  itemController.getAll
);

// Image routes
routes.post(image, imageController.upload);

export default routes;
