const knex = require('../database/knex');

class TagsController {
  async index(request, response) {
    const { note_id } = request.params;

    const tags = await knex('movie_tags').where({ note_id });

    return response.status(200).json({ ...tags });
  }
}

module.exports = TagsController;
