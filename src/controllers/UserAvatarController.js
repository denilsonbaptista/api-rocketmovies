const UserRepository = require('../repositories/UserRepository');
const UserUpdateAvatarService = require('../services/UserUpdateAvatarService');

class UserAvatarController {
  async update(request, response) {
    const user_id = request.user.id;
    const avatarFilename = request.file.filename;

    const userRepository = new UserRepository();
    const userUpdateAvatarService = new UserUpdateAvatarService(userRepository);

    const user = await userUpdateAvatarService.updateAvatar({
      user_id,
      avatarFilename,
    });

    return response.json(user);
  }
}

module.exports = UserAvatarController;
