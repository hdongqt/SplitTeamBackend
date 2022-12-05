const _ = require("lodash");
const db = require("../../models");
const { match, team, user } = require("../../models");
const { Op } = require("sequelize");
const { calculateMatch } = require("../shared/common");
const { responseError } = require("../shared/handleError");

const UserService = {};

UserService.getUser = async (search) => {
  const matchUsers = await user.findAll({
    include: [
      {
        model: team,
        where: { status: "active" },
        through: { attributes: [] },
        required: false,
      },
    ],
    where: {
      status: {
        [Op.eq]: "active",
      },
      [Op.or]: {
        name: {
          [Op.iLike]: `%${search ? search : ""}%`,
        },
        username: {
          [Op.iLike]: `%${search ? search : ""}%`,
        },
      },
    },
    order: [["createdAt", "ASC"]],
  });
  const list = matchUsers.map((x) => x.get({ plain: true }));
  return calculateMatch(list);
};

UserService.getUserById = async (id) => {
  const matchOfUsers = await user.findOne({
    include: [
      {
        model: team,
        where: { status: "active" },
        through: { attributes: [] },
        required: false,
      },
    ],
    where: { status: "active", id: id },
  });
  if (matchOfUsers) {
    const amountMatch = matchOfUsers.get({ plain: true });
    return calculateMatch([amountMatch])[0];
  } else {
    return responseError("User not exits in the system", 404);
  }
};

UserService.createUser = async (name, username, winRateDefault) => {
  const defaultWinPercentage =
    typeof winRateDefault === "number" ? winRateDefault : null;
  const [userCreated, created] = await user.findOrCreate({
    where: { username: username.trim() },
    defaults: {
      name: name.trim(),
      username: username.trim(),
      winRateDefault: defaultWinPercentage,
    },
  });
  if (created) {
    return userCreated;
  } else {
    return responseError("Username already exists in the system", 400);
  }
};

UserService.deleteUser = async (id) => {
  const users = await user.findOne({ where: { status: "active", id: id } });
  if (users) {
    return user.update({ status: "deactivate" }, { where: { id: id } });
  } else {
    return responseError("User not exits in the system", 400);
  }
};

UserService.editUser = async (id, name, winRateDefault) => {
  const userFind = await user.findOne({
    where: { status: "active", id: id },
  });
  if (userFind) {
    const defaultWinPercentage =
      typeof winRateDefault === "number" ? winRateDefault : null;
    return user.update(
      {
        name: name,
        winRateDefault: defaultWinPercentage,
      },
      { where: { id: id } }
    );
  } else {
    return responseError("User not exits in the system", 400);
  }
};

module.exports = UserService;
