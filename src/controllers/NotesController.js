const sqliteConnection = require('../database/sqlite');

class NotesController {
  async create(request, response) {
    const { title, description, rating, tags } = request.body;
    const { user_id } = request.params;

    const database = await sqliteConnection();

    const insertNote = await database.run(
      'INSERT INTO movie_notes ( title, description, rating, user_id ) VALUES ( ?, ?, ?, ? )',
      [title, description, rating, user_id],
    );

    const note_id = insertNote.lastID;

    const insertTags = tags.map(name => {
      return database.run(
        'INSERT INTO movie_tags ( note_id, user_id, name ) VALUES ( ?, ?, ? )',
        [note_id, user_id, name],
      );
    });

    await Promise.all(insertTags);

    response.status(201).json();
  }

  async show(request, response) {
    const { id } = request.params;

    const database = await sqliteConnection();

    const note = await database.get(
      'SELECT * FROM movie_notes WHERE id = (?)',
      [id],
    );

    const tags = await database.all(
      'SELECT * FROM movie_tags WHERE note_id = (?) ORDER BY name ASC',
      [note.id],
    );

    return response.status(200).json({
      ...note,
      tags,
    });
  }

  async delete(request, response) {
    const { id } = request.params;

    const database = await sqliteConnection();

    await database.run('DELETE FROM movie_notes WHERE id = ?', [id]);

    response.status(200).json();
  }

  async index(request, response) {
    const { title, user_id, tags } = request.query;

    const database = await sqliteConnection();

    let notes;

    if (tags) {
      const filterTags = tags.split(',').map(tag => tag.trim());

      notes = await database.all(
        `
        SELECT movie_notes.id, movie_notes.title, movie_notes.user_id
        FROM movie_tags
        INNER JOIN movie_notes ON movie_notes.id = movie_tags.note_id
        WHERE movie_notes.user_id = ?
          AND movie_notes.title LIKE ?
          AND movie_tags.name IN (${filterTags.map(() => '?').join(',')})
        ORDER BY movie_notes.title
      `,
        [user_id, `%${title}%`, ...filterTags],
      );
    } else {
      notes = await database.all(
        `
        SELECT id, title, user_id
        FROM movie_notes
        WHERE user_id = ?
          AND title LIKE ?
        ORDER BY title
      `,
        [user_id, `%${title}%`],
      );
    }

    const userTags = await database.all(
      'SELECT * FROM movie_tags WHERE user_id = ?',
      [user_id],
    );

    const notesWithTags = notes.map(note => {
      const noteTags = userTags.filter(tag => tag.note_id === note.id);

      return {
        ...note,
        tags: noteTags,
      };
    });

    response.json(notesWithTags);
  }
}

module.exports = NotesController;
