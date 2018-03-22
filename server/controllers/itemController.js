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
        TodoId: todo.id
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
    .then((todo) => {
      if (!todo) {
        return res.status(404).send({message: 'Todo not found'});
      }

      db.Item.findOne({
        where: {id: req.params.item_id}
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
    })
    .catch((err) => {
      return res.status(400).send(err);
    });
  }

  fetchItemList(req, res) {
    db.Todo.findOne({
      where: {id: req.params.id}
    })
    .then((todo) => {
      if (!todo) {
        return res.status(404).send({message: 'todo not found'})
      }

      db.Item.findAll({
        where: {TodoId: todo.id}
      })
      .then((items) => {
        if (items.length === 0) {
          return res.status(404).send({message: 'you have no items'})
        }

        return res.status(200).send(items)
      })
      .catch((err) => {
        return res.status(400).send(err);
      }); 
    })
  }

  fetchItem(req, res) {
    db.Todo.findOne({
      where: {id: req.params.id}
    })
    .then((todo) => {
      if (!todo) {
        return res.status(404).send({message: 'todo not found'})
      }

      db.Item.findOne({
        where: {id: req.params.item_id}
      })
      .then((item) => {
        if (item.length === 0) {
          return res.status(404).send({message: 'item does not exist'})
        }

        return res.status(200).send(item)
      })
      .catch((err) => {
        return res.status(400).send(err);
      });
    })
  }

  deleteItem(req, res) {
    db.Todo.findOne({
      where: {id: req.params.id}
    })
    .then(todo => {
      if (!todo) {
        return res.status(404).send({message: 'todo not found'})
      }

      db.Item.findOne({
        where: {id: req.params.item_id}
      })
      .then(item => {
        if (!item) {
          return res.status(200).send({message: 'item not found'})
        }

        item.destroy()
        return res.status(200).send({message: 'delete successful'});
      })
    })
    .catch(err => {
      return res.status(400).send(err);
    })
  }
}
