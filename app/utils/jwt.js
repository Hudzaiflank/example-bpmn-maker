const jwt = require('jsonwebtoken');
const config = require('../../config/environment-config');
config.loadEnvironmentVariables();

const createJWT = ({ payload }) => {
  const expiresIn = process.env.JWT_EXPIRATION_TIME || '900';

  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: parseInt(expiresIn, 10),
  });
  return token;
};

const isTokenValid = ({ token }) =>
  jwt.verify(token, process.env.JWT_SECRET_KEY);

module.exports = {
  createJWT,
  isTokenValid,
};
