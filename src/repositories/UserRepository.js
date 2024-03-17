const sqliteConnection = require('../database/sqlite');

class UserRepository {
  async findByIdAndEmail(id, email) {
    const database = await sqliteConnection();

    const user = await database.get(
      'SELECT * FROM users WHERE id = ? OR email = ?',
      [id, email],
    );

    return user;
  }

  async create({ name, email, password }) {
    const database = await sqliteConnection();

    const userId = await database.run(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, password],
    );

    return { id: userId };
  }

  async update({ id, name, email, password }) {
    const database = await sqliteConnection();

    await database.run(
      `
      UPDATE users SET
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME('now')
      WHERE id = ?`,
      [name, email, password, id],
    );

    return;
  }

  async updatedAvatar(userId, avatarFilename) {
    const database = await sqliteConnection();

    await database.run(
      `
      UPDATE users SET
      avatar = ?
      WHERE id = ?`,
      [avatarFilename, userId],
    );

    return;
  }
}

module.exports = UserRepository;
