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
  logout, filterItems,
  itemView, itemPhone
} from 'constants/urls'
import { routes as hiddenRoutes } from 'serverConfig'

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

// hidden user routes
routes.get(
  hiddenRoutes.verifyUser,

  userController.verifyUser
)

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
routes.put(
  itemView,

  itemController.updateViews
);
routes.post(
  itemPhone,
  authenticate,

  itemController.findPhoneNumber
)

// Items routes
routes.post(
  items,

  itemController.getAllHandler
);
routes.post(
  filterItems,

  itemController.filterHandler
)

// Image routes
routes.post(image, imageController.upload);

export default routes;
