import serviceUser from "../services/service-user.js";

const register = async (req, res, next) => {
  try {
    const result = await serviceUser.register(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await serviceUser.login(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const result = await serviceUser.get(req.user.username);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    req.body.username = req.user.username;
    const result = await serviceUser.update(req.body);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const logout = async (req, res, next) => {
  try {
    const result = await serviceUser.logout(req.user.username);
    res.status(200).json({
      data: `${result.name} telah logout`,
    });
  } catch (e) {
    next(e);
  }
};

export default { register, login, get, update, logout };
