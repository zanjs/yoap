import express from 'express'
import { userController, itemController } from 'controllers'
import { signup, login, items } from 'constants/urls'

const routes = express();


// User routes
routes.post(signup, userController.signup);
routes.post(login, userController.login);
routes.post(items, itemController.post);
routes.get(items, itemController.get);

export default routes;
