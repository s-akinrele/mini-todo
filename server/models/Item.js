module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      defaultValue: 'unstarted',
      type:   DataTypes.ENUM,
      values: ['unstarted', 'started', 'complete']
    },
    todoId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
    {
      classMethods: {
        associate: (models) => {
          Item.belongsTo(models.Todo, {
            onDelete: 'CASCADE',
            foreignKey: { allowNull: false }
        });
      }
    }
  });

  return Item;
};