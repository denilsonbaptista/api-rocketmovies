const UserRepository = require('../repositories/UserRepository');
const SessionsService = require('../services/SessionsService');

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body;

    const userRepository = new UserRepository();
    const sessionsService = new SessionsService(userRepository);

    const { user, token } = await sessionsService.createSession({
      email,
      password,
    });

    return response.json({ user, token });
  }
}

module.exports = SessionsController;
