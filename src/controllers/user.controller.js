const { responseError } = require("../shared/handleError");
const UserService = require("../services/user.service");

const getUser = async (req, res, next) => {
  try {
    const { search } = req.query;
    const result = await UserService.getUser(search);
    res.status(200).json(result);
  } catch (error) {
    next(responseError(error));
  }
};

const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await UserService.getUserById(id);
    if (result && result.hasOwnProperty("message")) {
      return next(result);
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    next(responseError(error));
  }
};

const createUser = async (req, res, next) => {
  try {
    const { name, username, winRateDefault } = req.body;
    const result = await UserService.createUser(name, username, winRateDefault);
    if (result && result.hasOwnProperty("message")) {
      return next(result);
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    next(responseError(error));
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await UserService.deleteUser(id);
    if (result && result.hasOwnProperty("message")) {
      return next(result);
    } else {
      res.status(200).json({
        message: "Delete user successfully",
      });
    }
  } catch (error) {
    next(responseError(error));
  }
};

const editUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, winRateDefault } = req.body;
    const result = await UserService.editUser(id, name, winRateDefault);
    if (result && result.hasOwnProperty("message")) {
      return next(result);
    } else {
      res.status(200).json({
        message: "Update user successfully",
      });
    }
  } catch (error) {
    next(responseError(error));
  }
};

module.exports = {
  getUser,
  editUser,
  getUserById,
  createUser,
  deleteUser,
};
