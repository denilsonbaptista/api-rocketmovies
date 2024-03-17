const AppError = require('../utils/AppError');
const DiskStorage = require('../providers/DiskStorage');

class UserUpdateAvatarService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async updateAvatar({ user_id, avatarFilename }) {
    const diskStorage = new DiskStorage();

    const user = await this.userRepository.findByIdAndEmail(user_id, null);

    if (!user) {
      throw new AppError(
        'Somente usuário autenticados podem mudar o avatar',
        401,
      );
    }

    if (user.avatar) {
      await diskStorage.deleteFile(user.avatar);
    }

    const filename = await diskStorage.saveFile(avatarFilename);
    user.avatar = filename;

    await this.userRepository.updatedAvatar(user_id, filename);

    return user;
  }
}

module.exports = UserUpdateAvatarService;
