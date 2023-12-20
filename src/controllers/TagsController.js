const sqliteConnection = require('../database/sqlite');

class TagsController {
  async index(request, response) {
    const { user_id } = request.params;

    const database = await sqliteConnection();

    const tags = await database.all(
      'SELECT * FROM movie_tags WHERE user_id = ?',
      [user_id],
    );

    response.json({ ...tags });
  }
}

module.exports = TagsController;
