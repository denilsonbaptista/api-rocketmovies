const { Router } = require('express');
const multer = require('multer');
const uploadConfig = require('../configs/upload');

const UsersController = require('../controllers/UsersController');
const UserAvatarController = require('../controllers/UserAvatarController');
const UsersValidatedController = require('../controllers/UsersValidatedController');

const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const usersRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const userController = new UsersController();
const userAvatarController = new UserAvatarController();
const usersValidatedController = new UsersValidatedController();

usersRoutes.post('/', userController.create);
usersRoutes.put('/', ensureAuthenticated, userController.update);
usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);
usersRoutes.get(
  '/validated',
  ensureAuthenticated,
  usersValidatedController.index,
);

module.exports = usersRoutes;
