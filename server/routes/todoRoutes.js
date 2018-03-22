import Authorization from '../middlewares/auth';
import TodoController from '../controllers/todoController';

const authorize = new Authorization();
const todos = new TodoController();

const todoRoute = (router) => {
  router.route('/todos')
    .post(authorize.verifyToken, todos.createTodo)
    .get(authorize.verifyToken, todos.findAllTodos)

    // TODO: add GET request for a single TODO
  router.route('/todos/:id')
    .get(authorize.verifyToken, todos.findTodo)
    .put(authorize.verifyToken, todos.updateTodo)
    .delete(authorize.verifyToken, todos.deleteTodo)

  router.route('/admin/todos')
    .get(authorize.verifyToken, todos.fetchAllItemAndTodoData)
}

export default todoRoute;
