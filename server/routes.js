import express from 'express'
import {
  userController, itemController, imageController,
} from 'controllers'
import { authenticate } from 'middlewares'
import {
  signup, login, items,
  item, image, itemFind,
  itemUpdate, itemToggleFeatured,
  updateUserData, checkUser,
  logout
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
routes.post(
  checkUser,
  authenticate,

  userController.checkAuth
);
routes.post(
  updateUserData,
  authenticate,

  userController.update
);
routes.post(
  logout,
  authenticate,

  userController.logout
);

// Item routes
routes.post(
  item,
  authenticate,

  itemController.itemHandler
);
routes.post(
  itemFind,

  itemController.getOne
);
routes.post(
  itemUpdate,
  authenticate,

  itemController.update
);
routes.post(
  itemToggleFeatured,
  authenticate,

  itemController.featured
);

// Items routes
routes.post(
  items,

  itemController.getAll
);

// Image routes
routes.post(image, imageController.upload);

export default routes;
