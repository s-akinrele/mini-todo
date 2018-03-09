import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt-nodejs';
import db from '../models';

const secret = process.env.SECRET;

export default class Users {
  createUser(req, res) {
    db.User.findOne({
      where: {email: req.body.email}
    })
    .then((user) => {
      if (user) {
        return res.status(409).send({message: `${req.body.email} already exists`});
      }
      db.User.create(req.body)
      .then((user) => {
        const token = jwt.sign({
          userId: user.id,
          email: user.email
        }, secret, { expiresIn: '2 days' });

        return res.status(201).send({message: 'user created succesfully', user, token})
      })
      .catch((err) => {
        res.status(400).send(err.errors);
      });
    });
  }

  updateUser(req, res) {
    db.User.findOne({
      where: {id: req.params.id}
    })
    .then((user) => {
      if (!user) {
        return res.status(404).send({message: 'user not found'})
      }
      user.update({
        firstname: req.body.firstname || user.firstname,
        lastname: req.body.lastname || user.lastname
      })
      .then((updatedUser) => {
        return res.status(200).send({message: 'user updated', updatedUser});
      })
      .catch((err) => {
        res.status(400).send(err.errors);
      });
    });
  }

  findAllUsers(req, res) {
    db.User.findAll({attributes: ['id', 'firstname', 'lastname', 'email']})
    .then((users) => {
      if (users.length  === 0) {
        return res.status(200).send({message: 'no users found'})
      }

      return res.status(200).send({users})
    })
    .catch((err) => {
      res.status(400).send(err.errors);
    });
  }

  deleteUser(req, res) {
    db.User.findOne({
      where: {id: req.params.id}
    })
    .then((user) => {
      if (!user) {
        return res.status(404).send({message: 'user not found'})
      }

      user.destroy()
        res.status(200).send({message: 'user deleted'})
    })
    .catch((err) => {
      return res.status(400).send(err.errors)
    })
  }

  findUserById(req, res) {
    db.User.findOne({
      where: {id: req.params.id}
    })
    .then((user) => {
      if (!user) {
        return res.status(404).send({message: 'user not found'})
      }
      
      return res.status(200).send(user)
    })
    .catch((err) => {
      res.status(400).send(err.errors)
    });
  }

  login(req, res) {
    db.User.findOne({
      where: {email: req.body.email}
    })
    .then((user) => {
      if (!user) {
        return res.status(404).send({message: `user with ${req.body.email} does not exist`})
      }

      if (bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign({
          userId: user.id,
          email: user.email
        }, secret, { expiresIn: '2 days' });

        return res.status(200).send({message:'user signed in', token});
      } 

      return res.status(400).send({message: 'user email or password is incorrect'})
    })
    .catch((err) => {
      res.status(400).send(err.errors);
    })
  }

  updateUserPassword(req, res) {
    db.User.findOne({
      where: {email: req.decoded.email}
    })
    .then((user) => {
      if (!user) {
        return res.status(404).send({message: 'user not found'})
      }

      if (bcrypt.compareSync(req.body.old_password, user.password)) {
        const newPassword = bcrypt.hashSync(req.body.password);
        user.update({password: newPassword})
        return res.status(200).send({message: 'password update successful'});
      }
    })
    .catch((err) => {
      return res.status(400).send(err.errors);
    });
  };
}
