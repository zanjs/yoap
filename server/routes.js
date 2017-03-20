import express from 'express'
import { userController } from 'controllers'
import { signup, login } from 'constants/urls'

const routes = express()


// User routes
routes.post(signup, userController.signup);
routes.post(login, userController.login);
//routes.post('/item', itemController.post);

export default routes;
