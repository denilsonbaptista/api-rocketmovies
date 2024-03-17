const UserRepository = require('../repositories/UserRepository');
const UserService = require('../services/UserService');

class UserController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const userRepository = new UserRepository();
    const userService = new UserService(userRepository);

    await userService.createUser({ name, email, password });

    return response.status(201).json();
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const user_id = request.user.id;

    const userRepository = new UserRepository();
    const userService = new UserService(userRepository);

    await userService.updateUser({
      id: user_id,
      name,
      email,
      password,
      old_password,
    });

    response.status(200).json();
  }
}

module.exports = UserController;
