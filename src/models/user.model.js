const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataType) => {
  const User = sequelize.define('User', {
    login: {
      type: DataType.STRING(120),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataType.STRING(60),
      allowNull: false
    }
  }, {
    createdAt: 'created_at',
    updatedAt: 'update_at',
    tableName: 'user',

    hooks: {
      beforeCreate: function (user) {
        user.set({
          password: hashPassword(user.get('password'))
        });
      },
      beforeUpdate: function (user) {
        if (!user.changed('password')) {
          return;
        }
        user.set({
          password: hashPassword(user.get('password'))
        });
      }
    }
  });

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.get('password'));
  };

  return User;
};

function hashPassword (password) {
  if (!password) {
    return false;
  }

  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}
