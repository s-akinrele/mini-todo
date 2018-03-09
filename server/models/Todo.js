module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
    {
      classMethods: {
        associate: (models) => {
          Todo.hasMany(models.Item, {
            foreignKey: 'todoId',
            onDelete: 'CASCADE'
          });
          Todo.belongsTo(models.User, {
            onDelete: 'CASCADE',
            foreignKey: { allowNull: false }
          });
      }
    }
  });

  return Todo;
};