import express from 'express'
import { userController, itemController } from 'controllers'
import { signup, login, items, item } from 'constants/urls'

const routes = express();


// User routes
routes.post(signup, userController.signup);
routes.post(login, userController.login);

// Item routes
routes.post(item, itemController.itemHandler);
routes.get(item, itemController.getOne);

// Items routes
routes.get(items, itemController.getAll);

export default routes;
