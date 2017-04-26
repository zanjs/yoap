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
  logout, filterItems
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

  itemController.createHandler
);
routes.post(
  itemFind,

  itemController.findOneHandler
);
routes.post(
  itemUpdate,
  authenticate,

  itemController.updateHandler
);
routes.post(
  itemToggleFeatured,
  authenticate,

  itemController.featuredHandler
);
routes.post(
  filterItems,

  itemController.filterHandler
)

// Items routes
routes.post(
  items,

  itemController.getAllHandler
);

// Image routes
routes.post(image, imageController.upload);

export default routes;
