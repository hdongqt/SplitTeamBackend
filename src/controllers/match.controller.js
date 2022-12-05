const { responseError } = require("../shared/handleError");
const MatchService = require("../services/match.service");

const getMatchs = async (req, res, next) => {
  try {
    const matches = await MatchService.getMatchs(req.query);
    res.status(200).json(matches);
  } catch (error) {
    next(responseError(error));
  }
};

const getMatchById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const matchFind = await MatchService.getMatchById(id);
    if (matchFind) {
      res.status(200).json(matchFind);
    } else {
      return next(responseError("Match not exits in the system", 404));
    }
  } catch (error) {
    next(responseError(error));
  }
};

const generateTeam = async (req, res, next) => {
  try {
    const { listUser, listUserPro } = req.body;
    const teamSplit = await MatchService.generateTeam(listUser, listUserPro);
    res.status(200).json(teamSplit);
  } catch (error) {
    return next(responseError(error));
  }
};

const createMatch = async (req, res, next) => {
  try {
    const { name, description, teamCT, teamT } = req.body;
    const result = await MatchService.createMatch(
      name,
      description,
      teamCT,
      teamT
    );
    if (result && result.hasOwnProperty("message")) {
      return next(result);
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    return next(responseError(error));
  }
};

const deleteMatch = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await MatchService.deleteMatch(id, next);
    if (result && result.hasOwnProperty("message")) {
      return next(result);
    } else {
      res.status(200).json({
        message: "Delete match successfully",
      });
    }
  } catch (error) {
    next(responseError(error));
  }
};

const editMatch = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, description } = req.body;
    const result = MatchService.editMatch(id, name, description);
    if (result && result.hasOwnProperty("message")) {
      return next(result);
    } else {
      res.status(200).json({
        message: "Update match successfully",
      });
    }
  } catch (error) {
    next(responseError(error));
  }
};

const setTeamWin = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { teamWin } = req.body;
    const result = await MatchService.setTeamWin(id, teamWin);
    if (result && result.hasOwnProperty("message")) {
      return next(result);
    } else {
      res.status(200).json({
        message: "Set team win successfully",
      });
    }
  } catch (error) {
    next(responseError(error));
  }
};

module.exports = {
  getMatchs,
  createMatch,
  generateTeam,
  getMatchById,
  deleteMatch,
  editMatch,
  setTeamWin,
};
