module.exports = { up, down };

async function up (db) {
  await db.User.create({
    login: 'admin',
    password: 'admin123'
  });
}

async function down (db) {
  await db.User.destroy({where: {}});
}
