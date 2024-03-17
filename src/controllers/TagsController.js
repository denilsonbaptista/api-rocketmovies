const TagsRepository = require('../repositories/TagsRepository');
const TagsService = require('../services/TagsService');

class TagsController {
  async index(request, response) {
    const { note_id } = request.params;

    const tagsRepository = new TagsRepository();
    const tagsService = new TagsService(tagsRepository);

    const tags = await tagsService.index({ note_id });

    return response.status(200).json({ ...tags });
  }
}

module.exports = TagsController;
