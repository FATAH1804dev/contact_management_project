import {
  registerUserValidation,
  loginUserValidation,
  getUserValidation,
  updateUserValidation,
} from "../validation/validation-user.js";
import { validate } from "../validation/validation.js";
import { prisma } from "../application/database.js";
import { responseError } from "../error/error-response.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

const register = async (request) => {
  const user = validate(registerUserValidation, request);

  const userCount = await prisma.user.count({
    where: {
      username: user.username,
    },
  });

  if (userCount == 1) {
    throw new responseError(400, "username already exist");
  }

  user.password = await bcrypt.hash(user.password, 10);

  return prisma.user.create({
    data: user,
    select: {
      username: true,
      name: true,
    },
  });
};

const login = async (request) => {
  const userLogin = validate(loginUserValidation, request);

  const checkUsernameinDatabase = await prisma.user.findUnique({
    where: {
      username: userLogin.username,
    },
    select: {
      username: true,
      password: true,
    },
  });

  if (!checkUsernameinDatabase) {
    throw new responseError(401, "username is wrong");
  }

  const checkPasswordLogin = await bcrypt.compare(
    userLogin.password,
    checkUsernameinDatabase.password,
  );
  if (!checkPasswordLogin) {
    throw new responseError(401, "password is wrong");
  }

  const generateToken = () => {
    return uuidv4();
  };

  return await prisma.user.update({
    where: { username: userLogin.username },
    data: { token: generateToken() },
    select: { username: true, name: true, token: true },
  });
};

const get = async (username) => {
  const user = validate(getUserValidation, username);

  const getLoggedinUser = await prisma.user.findUnique({
    where: {
      username: user,
    },
    select: {
      username: true,
      name: true,
    },
  });

  if (!getLoggedinUser) {
    throw new responseError(404, "user not found");
  }

  return getLoggedinUser;
};

const update = async (request) => {
  const user = validate(updateUserValidation, request);

  const checkUserInDB = await prisma.user.count({
    where: {
      username: user.username,
    },
  });

  if (checkUserInDB < 1) {
    throw new responseError(404, "user not found");
  }

  const data = {};

  if (user.name) {
    data.name = user.name;
  }

  if (user.password) {
    data.password = await bcrypt.hash(user.password, 10);
  }

  return await prisma.user.update({
    where: {
      username: user.username,
    },
    data: data,
    select: {
      username: true,
      name: true,
    },
  });
};

const logout = async (username) => {
  const user = validate(getUserValidation, username);

  const checkUsernameinDatabase = await prisma.user.findUnique({
    where: {
      username: user,
    },
  });

  if (!checkUsernameinDatabase) {
    throw new responseError(404, "user not found");
  }

  return await prisma.user.update({
    where: {
      username: user,
    },
    data: {
      token: null,
    },
    select: {
      username: true,
      name: true,
    },
  });
};

export default { register, login, get, update, logout };
