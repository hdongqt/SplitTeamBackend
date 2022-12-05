const { Router } = require("express");
const router = Router();

const {
  getMatchs,
  getMatchById,
  createMatch,
  generateTeam,
  deleteMatch,
  editMatch,
  setTeamWin,
} = require("../controllers/match.controller");
const {
  getUser,
  getUserById,
  createUser,
  editUser,
  deleteUser,
} = require("../controllers/user.controller");
const {
  validate,
  createMatchValid,
  editMatchValid,
  idValid,
  createUserValid,
  editUserValid,
  setTeamWinValid,
  generateTeamValid,
} = require("../middlewares/validator");

router.get("/api/matchs", getMatchs);
router.get("/api/matchs/:id", [idValid, validate], getMatchById);
router.post("/api/matchs", [createMatchValid, validate], createMatch);
router.post("/api/matchs/team", [generateTeamValid, validate], generateTeam);
router.put(
  "/api/matchs/set-team-win/:id",
  [setTeamWinValid, validate],
  setTeamWin
);
router.put("/api/matchs/:id", [editMatchValid, validate], editMatch);
router.delete("/api/matchs/:id", [idValid, validate], deleteMatch);
//user
router.get("/api/users", getUser);
router.get("/api/users/:id", [idValid, validate], getUserById);
router.post("/api/users", [createUserValid, validate], createUser);
router.put("/api/users/:id", [editUserValid, validate], editUser);
router.delete("/api/users/:id", [idValid, validate], deleteUser);

module.exports = router;
