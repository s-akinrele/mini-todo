import db from '../models'; 

export default class Item {

  createItemList(req, res) {
    db.Todo.findOne({
      where: {id: req.params.id}
    })
    .then((todo) => {
      if (!todo) {
        return res.status(404).send({message: 'Todo not found'});
      }

      db.Item.create({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        todoId: todo.id
      })
      .then((item) => {
        return res.status(200).send({message: 'item list created successfully', item});
      })
      .catch((err) => {
        return res.status(400).send(err);
      });
    })
    .catch((err) => {
      return res.status(400).send(err);
    });
  }

  updateItemList(req, res) {
    db.Todo.findOne({
      where: {id: req.params.id}
    })
    .then((todo) =>{
      if (!todo) {
        return res.status(404).send({message: 'Todo not found'});
      }

      db.Item.findOne({
        where: {todoId: todo.id}
      })
      .then((item) => {
        if (!item) {
          return res.status(404).send({message: `Item not found for this ${todo.title} list`});
        }

        item.update({
          title: req.body.title || item.title,
          description: req.body.description || item.description,
          status: req.body.status || item.status,
        })
        .then((updatedItem) => {
          return res.status(200).send({message: 'item updated successfully', updatedItem});
        })
        .catch((err) => {
          return res.status(400).send(err);
        });   
      })
      .catch((err) => {
        return res.status(400).send(err);
      });   
    });
  }
}
