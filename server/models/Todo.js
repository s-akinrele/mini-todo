module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }
);
  Todo.associate = function(models) {
    Todo.hasMany(models.Item, {
      as: 'items',
      onDelete: 'CASCADE'
    });
    Todo.belongsTo(models.User, {
      onDelete: 'CASCADE',
      foreignKey: { allowNull: false }
    });
  }

  return Todo;
};
