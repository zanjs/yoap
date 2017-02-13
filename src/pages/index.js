/* Pages entry point */
import InfoPage from './InfoPage/InfoPage'
import TodosPage from './TodosPage/TodosPage'
import LoginPage from './LoginPage/LoginPage'
import SignupPage from './SignupPage/SignupPage'
import UserPage from './UserPage/UserPage'
import BoardPage from './BoardPage/BoardPage'


export default [{
  component: TodosPage,
  path: '/',
  exact: true,

  value: 'todo list'
}, {
  component: InfoPage,
  path: '/info',
  exact: true,

  value: 'info'
}, {
  component: BoardPage,
  path: '/board',
  exact: true,

  value: 'board'
}, {
  component: LoginPage,
  path: '/login',
  exact: true,

  value: 'login'
}, {
  component: SignupPage,
  path: '/signup',
  exact: true,

  value: 'sign up'
}, {
  component: UserPage,
  path: '/you',
  exact: true,

  value: 'you'
}]

// UserPage
