import Authorization from '../middlewares/auth';
import TodoController from '../controllers/todoController';

const authorize = new Authorization();
const todos = new TodoController();

const todoRoute = (router) => {
  router.route('/todos')
    .post(authorize.verifyToken, todos.createTodo)

  router.route('/todos/:id')
    .put(authorize.verifyToken, todos.updateTodo)
}

export default todoRoute;