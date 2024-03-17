const AppError = require('../utils/AppError');

class UsersValidatedService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async validateUser({ id }) {
    const checkUserExists = await this.userRepository.findByIdAndEmail(
      id,
      null,
    );

    if (checkUserExists.length === 0) {
      throw new AppError('Unauthorized', 401);
    }

    return checkUserExists;
  }
}

module.exports = UsersValidatedService;
