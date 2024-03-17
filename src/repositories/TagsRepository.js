const knex = require('../database/knex');

class TagsRepository {
  async findByTagNoteId({ note_id }) {
    return await knex('movie_tags').where({ note_id }).orderBy('name');
  }

  async findByTagUserId({ user_id }) {
    const userTags = await knex('movie_tags').where({ user_id });

    return userTags;
  }

  async searchNoteByTag(user_id, title, filterTags) {
    const notes = await knex('movie_tags')
      .select([
        'movie_notes.id',
        'movie_notes.title',
        'movie_notes.description',
        'movie_notes.rating',
        'movie_notes.user_id',
      ])
      .where('movie_notes.user_id', user_id)
      .whereLike('movie_notes.title', `%${title}%`)
      .whereIn('name', filterTags)
      .innerJoin('movie_notes', 'movie_notes.id', 'movie_tags.note_id')
      .orderBy('movie_notes.title');

    return notes;
  }

  async createNewTags(tagsInsert) {
    return await knex('movie_tags').insert(tagsInsert);
  }
}

module.exports = TagsRepository;
