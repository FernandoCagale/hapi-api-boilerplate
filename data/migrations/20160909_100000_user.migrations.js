const User = require('../../src/models/user.model');

module.exports = { up, down };

async function up (db) {
  const DataType = db.Sequelize;

  const User = db.sequelize.define('User', {
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
    tableName: 'user'
  });

  await User.sync();
}

async function down (db) {
  await User(db.sequelize, db.Sequelize).drop();
}
