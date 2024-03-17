const { compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');

const AppError = require('../utils/AppError');
const authConfig = require('../configs/auth');

class SessionsService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async createSession({ email, password }) {
    const user = await this.userRepository.findByIdAndEmail(null, email);

    if (!user) {
      throw new AppError('E-mail e/ou senha incorreta', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('E-mail e/ou senha incorreta', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    });

    delete user.password;

    return {
      user,
      token,
    };
  }
}

module.exports = SessionsService;
