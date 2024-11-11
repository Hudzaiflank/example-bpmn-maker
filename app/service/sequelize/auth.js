const validator = require('validator');
const { BadRequestError, NotFoundError } = require('../../errors');
const { sequelize } = require('../../../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const User = require('../../../models').User;
const config = require('../../../config/environment-config');
config.loadEnvironmentVariables();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const createUser = async (email, password, fullName) => {
  let sequelizeUser;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const result = await sequelize.transaction(async (t) => {
      sequelizeUser = await User.create(
        {
          email: email,
          fullName: fullName,
          password: hashedPassword,
        },
        {
          transaction: t,
        }
      );
      return sequelizeUser;
    });
    return result;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const registerUser = async (req) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    throw new BadRequestError('Fullname, email, and password is required');
  }

  // Check if email exists in PostgreSQL database
  const user = await User.findOne({ where: { email } });
  if (user) {
    throw new BadRequestError('Email already exists');
  }

  // Validate email
  const isEmail = await validator.isEmail(email);
  if (!isEmail) {
    throw new BadRequestError('Invalid Email');
  }

  const strongPassword = await validator.isStrongPassword(password);
  if (!strongPassword) {
    throw new BadRequestError('Weak Password');
  }

  // Create user in PostgreSQL database
  const userCreated = await createUser(email, fullName, password);

  if (!userCreated) {
    throw new Error();
  }

  return userCreated;
};

const loginUser = async (req) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new NotFoundError('User not found');
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new BadRequestError('Incorrect password');
  }

  // User is authenticated, generate a JWT
  const token = jwt.sign({ user: user }, SECRET_KEY, { expiresIn: process.env.JWT_EXPIRATION });

  return { user, token };
};

module.exports = { registerUser, loginUser };
