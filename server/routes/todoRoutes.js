import Authorization from '../middlewares/auth';
import TodoController from '../controllers/todoController';

const authorize = new Authorization();
const todos = new TodoController();

const todoRoute = (router) => {
  router.route('/todos')
    .post(authorize.verifyToken, todos.createTodo)
    .get(authorize.verifyToken, todos.findAllTodos)

  router.route('/todos/:id')
    .put(authorize.verifyToken, todos.updateTodo)
    .delete(authorize.verifyToken, todos.deleteTodo)
}

export default todoRoute;
