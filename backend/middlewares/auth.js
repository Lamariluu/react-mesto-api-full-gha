const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  // проверка наличия токена
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Необходима авторизация 1'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    // верификация токена
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key'); // было payload = jwt.verify(token, 'secret-key');
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация 2'));
  }
  // добавление пейлоуд токена в объект запроса
  req.user = payload;
  return next();
};

module.exports = auth;
