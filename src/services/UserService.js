const { hash, compare } = require('bcryptjs');
const AppError = require('../utils/AppError');

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async createUser({ name, email, password }) {
    const checkUserExists = await this.userRepository.findByIdAndEmail(
      null,
      email,
    );

    if (checkUserExists) {
      throw new AppError('Este e-mail já está em uso.');
    }

    const hashedPassword = await hash(password, 8);

    const userCreated = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return userCreated;
  }

  async updateUser({ id, name, email, password, old_password }) {
    const user = await this.userRepository.findByIdAndEmail(id, null);

    if (!user) {
      throw new AppError('Usuário não encontrado');
    }

    const userWithUpdatedEmail = await this.userRepository.findByIdAndEmail(
      null,
      email,
    );

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError('Este e-mail já está em uso.');
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && !old_password) {
      throw new AppError(
        'Você precisa informar a senha antiga para definir a nova senha.',
      );
    }

    if (!password && old_password) {
      throw new AppError('Você precisa informar a nova senha.');
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError('A senha antiga não confere.');
      }

      user.password = await hash(password, 8);
    }

    await this.userRepository.update({
      id,
      name: user.name,
      email: user.email,
      password: user.password,
    });
  }
}

module.exports = UserService;
