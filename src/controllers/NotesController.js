const NotesRepository = require('../repositories/NotesRepository');
const TagsRepository = require('../repositories/TagsRepository');
const NotesService = require('../services/NotesService');

class NotesController {
  async create(request, response) {
    const { title, description, rating, tags } = request.body;
    const user_id = request.user.id;

    const notesRepository = new NotesRepository();
    const tagsRepository = new TagsRepository();
    const notesService = new NotesService(notesRepository, tagsRepository);

    await notesService.createNote({
      user_id,
      title,
      description,
      rating,
      tags,
    });

    response.status(201).json();
  }

  async show(request, response) {
    const { id } = request.params;

    const notesRepository = new NotesRepository();
    const tagsRepository = new TagsRepository();
    const notesService = new NotesService(notesRepository, tagsRepository);

    const note = await notesService.showNote(id);

    return response.status(200).json(note);
  }

  async delete(request, response) {
    const { id } = request.params;

    const notesRepository = new NotesRepository();
    const tagsRepository = new TagsRepository();
    const notesService = new NotesService(notesRepository, tagsRepository);

    await notesService.deleteNote(id);

    return response.status(200).json();
  }

  async index(request, response) {
    const { title, tags } = request.query;

    const user_id = request.user.id;

    const notesRepository = new NotesRepository();
    const tagsRepository = new TagsRepository();
    const notesService = new NotesService(notesRepository, tagsRepository);

    const notesWithTags = await notesService.indexNote({
      user_id,
      title,
      tags,
    });

    return response.status(200).json(notesWithTags);
  }
}

module.exports = NotesController;
