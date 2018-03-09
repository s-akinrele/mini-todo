import AuthorizationMiddleware from '../middlewares/auth';
import UserController from '../controllers/userController';
import TodoController from '../controllers/todoController';

const authorize = new AuthorizationMiddleware();
const users = new UserController();
const todo = new TodoController();

const userRoute = (router) => {
  router.route('/users')
    .get(authorize.verifyToken, users.findAllUsers)
    .post(users.createUser)

  router.route('/users/:id')
    .get(authorize.verifyToken, users.findUserById)
    .put(authorize.verifyToken, users.updateUser)
    .delete(authorize.verifyToken, users.deleteUser)

    router.route('/reset_password')
    .put(authorize.verifyToken, users.updateUserPassword)

    router.route('/login')
    .post(users.login)

    router.route('/users/:id/todos')
      .get(authorize.verifyToken, todo.findUserTodos)
  }

export default userRoute;
