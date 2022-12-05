const { validationResult, param, check } = require("express-validator");
const { responseError } = require("../shared/handleError");
const { TEAM_OF_MATCH } = require("../shared/constant");

const checkLength = (key, keytext, min, max) => {
  return [
    check(key)
      .trim()
      .isLength({ min: min, max: max })
      .withMessage(`${keytext} must be ${min} to ${max} characters long`),
  ];
};

const idValid = [param("id").isUUID(4).withMessage("Id must be a uuid")];

const validate = (req, res, next) => {
  const error = validationResult(req)
    .array()
    .map((item) => item.msg);
  if (error.length) {
    return next(responseError(error, 400));
  } else {
    return next();
  }
};

const createMatchValid = [
  ...checkLength("name", "Name match", 3, 70),
  ...checkLength("description", "Description", 5, 150),
  check("teamT")
    .isArray({ min: 1 })
    .withMessage("Terrorist team player list must be more than 1 person"),
  check("teamCT")
    .isArray({ min: 1 })
    .withMessage(
      "Counter-Terrorist team player list must be more than 1 person"
    ),
];

const setTeamWinValid = [
  ...idValid,
  check("teamWin")
    .isIn(TEAM_OF_MATCH)
    .withMessage("Team Win must be T: Terrorist or CT: Counter-Terrorist"),
];

const editMatchValid = [
  ...idValid,
  check("name")
    .trim()
    .isLength({ min: 3, max: 95 })
    .withMessage("Name match must be 3 to 70 characters long"),
  ...checkLength("description", "Description", 5, 150),
];

const createUserValid = [
  ...checkLength("username", "Username", 5, 20),
  ...checkLength("name", "Name user", 2, 30),
  check("winRateDefault")
    .isFloat({ min: 0, max: 100 })
    .withMessage("Win rate default must start from 0 to 100").optional({nullable: true, checkFalsy: true})
  ,
];

const editUserValid = [...checkLength("name", "Name user", 2, 30),
  check("winRateDefault")
      .isFloat({ min: 0, max: 100 })
      .withMessage("Win rate default must start from 0 to 100").optional({nullable: true, checkFalsy: true})
  ,
  ...idValid,];

const generateTeamValid = [
  check("listUser")
    .isArray({ min: 2 })
    .withMessage("List user must be more than 2 person"),
];

module.exports = {
  idValid,
  checkLength,
  createMatchValid,
  editMatchValid,
  createUserValid,
  editUserValid,
  setTeamWinValid,
  generateTeamValid,
  validate,
};
