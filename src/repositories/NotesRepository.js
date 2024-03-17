const knex = require('../database/knex');

class NotesRepository {
  async findByNote({ id }) {
    return await knex('movie_notes').where({ id }).first();
  }

  async searchNotes(user_id, title) {
    const notes = await knex('movie_notes')
      .where({ user_id })
      .whereLike('title', `%${title}%`)
      .orderBy('title');

    return notes;
  }

  async createNote({ user_id, title, description, rating }) {
    const [note_id] = await knex('movie_notes').insert({
      title,
      description,
      rating,
      user_id,
    });

    return note_id;
  }

  async deleteNote({ id }) {
    await knex('movie_notes').where({ id }).delete();

    return;
  }
}

module.exports = NotesRepository;
