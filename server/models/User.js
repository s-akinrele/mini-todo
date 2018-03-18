'use strict';

var bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 6
      }
    }
  },
    {
      hooks: {
        beforeCreate: (user, options) => {
           user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10))
           return user;
        }
      }
    }
);

  User.associate = function(models) {
    User.hasMany(models.Todo, {
      onDelete: 'CASCADE'
    });
  }

  return User;
};
