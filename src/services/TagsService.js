class TagsService {
  constructor(tagsRepository) {
    this.tagsRepository = tagsRepository;
  }

  async index({ note_id }) {
    return await this.tagsRepository.findByTag({ note_id });
  }
}

module.exports = TagsService;
