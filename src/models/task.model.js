module.exports = (sequelize, DataType) => {
  const Task = sequelize.define('Task', {
    title: {
      type: DataType.STRING(120),
      allowNull: false
    },
    userId: {
      type: DataType.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      },
      field: 'user_id'
    }
  }, {
    createdAt: 'created_at',
    updatedAt: 'update_at',
    tableName: 'task',

    classMethods: {
      associate: (models) => {
        Task.belongsTo(models.User, {
          foreignKey: 'userId'
        });
      }
    },

    scopes: {
      user: function (userId) {
        return {
          where: {
            id: userId
          }
        };
      }
    }
  });

  return Task;
};
