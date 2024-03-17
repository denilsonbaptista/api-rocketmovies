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

    response.cookie('token', token, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 15 * 60 * 1000,
    });

    return response.json({ user });
  }
}

module.exports = SessionsController;
