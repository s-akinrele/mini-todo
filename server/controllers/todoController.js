import db from '../models';
export default class Todo {

  createTodo(req, res) {
    const todos = {
      title: req.body.title,
      description: req.body.description,
      userId: req.decoded.userId
    }

  db.Todo.create(todos)
    .then((todo) => {
      return res.status(201).send({message: 'Todo created', todo});
    })
    .catch((err) => {
      return res.status(400).send({message: 'An error occured', error: err})
    })
  }

  updateTodo(req, res) {
    db.Todo.findOne({
      where: {id: req.params.id}
    })
    .then((todo) => {
      if (!todo) {
        return res.status(404).send({message: 'Todo not found'})
      }
      todo.update({
        title: req.body.title || todo.title,
        description: req.body.description || todo.description
      })
      .then((updateTodo) => {
        return res.status(200).send({message: 'Todo updated', updateTodo})
      })
    })
    .catch((err) => {
      return res.status(400).send(err);
    });
  }

  findAllTodos(req, res) {
    db.Todo.findAll()
      .then((todos) => {
        if (todos.length === 0) {
          return res.status(200).send({message: 'No todo has been created'})
        }
        
        return res.status(200).send(todos)
      })
      .catch((err) => {
        return res.status(400).send(err);
      });
  }

  findUserTodos(req, res) {
    db.User.findOne({
      where: {id: req.params.id}
    })
    .then((user) => {
      if (!user) {
        return res.status(404).send({message: 'User doesnt exist'})
      }

      db.Todo.findAll({
        where: {userId: user.id}
      })
      .then((todos) => {
        if (todos.length === 0) {
          return res.status(200).send({message: 'you are yet to create your todos'});
        }

        return res.status(200).send(todos);
      })
    })
    .catch((err) => {
      return res.status(400).send(err);
    });
  }

  deleteTodo(req, res) {
    db.Todo.findOne({
      where: {id: req.params.id}
    })
    .then((todo) => {
      if (!todo) {
        return res.status(400).send({message: 'todo not found'})
      }

      todo.destroy()
      return res.status(200).send({message: 'delete successful'})
    })
    .catch((err) => {
      return res.status(400).send(err);
    })
  }
}
