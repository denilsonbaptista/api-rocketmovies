class NotesService {
  constructor(notesRepository, tagsRepository) {
    this.notesRepository = notesRepository;
    this.tagsRepository = tagsRepository;
  }

  async createNote({ user_id, title, description, rating, tags }) {
    const note_id = await this.notesRepository.createNote({
      user_id,
      title,
      description,
      rating,
    });

    const tagsInsert = tags.map(name => {
      return {
        note_id,
        user_id,
        name,
      };
    });

    await this.tagsRepository.createNewTags(tagsInsert);

    return;
  }

  async showNote(id) {
    const note = await this.notesRepository.findByNote({ id });
    const tags = await this.tagsRepository.findByTagNoteId({ note_id: id });

    return {
      ...note,
      tags,
    };
  }

  async deleteNote(id) {
    await this.notesRepository.deleteNote({ id });

    return;
  }

  async indexNote({ user_id, title, tags }) {
    let notes;

    if (tags) {
      const filterTags = tags.split(',').map(tag => tag.trim());

      notes = await this.tagsRepository.searchNoteByTag(
        user_id,
        title,
        filterTags,
      );
    } else {
      notes = await this.notesRepository.searchNotes(user_id, title);
    }

    const userTags = await this.tagsRepository.findByTagUserId({ user_id });

    const notesWithTags = notes.map(note => {
      const noteTags = userTags.filter(tag => tag.note_id === note.id);

      return {
        ...note,
        tags: noteTags,
      };
    });

    return notesWithTags;
  }
}

module.exports = NotesService;
