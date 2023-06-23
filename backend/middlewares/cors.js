const allowedCors = [
  'https://127.0.0.1:3000',
  'http://127.0.0.1:3000',
  'http://localhost:3000',
  'https://localhost:3000',
  'http://localhost:3001',
  'https://localhost:3001',
  'https://lamarilu.nomoredomains.rocks',
  'https://api.lamarilu.nomoredomains.rocks',
  'http://lamarilu.nomoredomains.rocks',
  'http://api.lamarilu.nomoredomains.rocks',
];

const cors = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  res.header('Access-Control-Allow-Credentials', true);

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);

    return res.end();
  }

  return next();
};

module.exports = cors;
