const UserRepository = require('../repositories/UserRepository');
const UsersValidatedService = require('../services/UsersValidatedService');

class UsersValidatedController {
  async index(request, response) {
    const { user } = request;

    const userRepository = new UserRepository();
    const usersValidatedService = new UsersValidatedService(userRepository);

    await usersValidatedService.validateUser({ id: user.id });

    return response.status(200).json();
  }
}

module.exports = UsersValidatedController;
