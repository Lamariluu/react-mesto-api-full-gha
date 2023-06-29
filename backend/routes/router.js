const router = require('express').Router();
// const { errors } = require('celebrate');
// const cors = require('cors');
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const NotFoundError = require('../errors/NotFoundError');
// const auth = require('../middlewares/auth');
// const { createUserValidation, loginValidation } = require('../middlewares/validation');
// const { login, createUser } = require('../controllers/users');
// const { requestLogger, errorLogger } = require('../middlewares/logger');

// router.use(requestLogger); // подключаем логгер запросов
// router.use(cors());
// router.get('/crash-test', () => {
//  setTimeout(() => {
//    throw new Error('Сервер сейчас упадёт');
//  }, 0);
// });
// router.post('/signin', loginValidation, login);
// router.post('/signup', createUserValidation, createUser);
// router.use(auth);
router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use((req, res, next) => {
  next(new NotFoundError('Такой страницы не существует'));
});

// router.use(errorLogger); // подключаем логгер ошибок
// router.use(errors({ message: 'Ошибка валидации данных' })); // обработчик ошибок celebrate

module.exports = router;
