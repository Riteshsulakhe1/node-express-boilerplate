const httpStatus = require('http-status');
const { sprintService, taskService } = require('../services');
const catchAsync = require('../utils/catchAsync');
const { sprintMsg } = require('../utils/messages');
const { addTaskIdsInSprint } = require('../scripts/sprint');
const getSprints = catchAsync(async (req, res) => {
  if (req.project) {
    const sprints = await sprintService.getSprintsByProjectId(req.project.id);
    res.status(httpStatus.OK).send({ sprints });
  } else {
    res.status(httpStatus.UNPROCESSABLE_ENTITY).send({ message: sprintMsg.projectIdMissing });
  }
});

const createNewSprint = catchAsync(async (req, res) => {
  if (req.project) {
    const sprint = await sprintService.createEmptySprint(req.body, req.project.key);
    res.status(httpStatus.CREATED).send({ message: sprintMsg.created, sprint });
  } else {
    res.status(httpStatus.UNPROCESSABLE_ENTITY).send({ message: sprintMsg.projectIdMissing });
  }
});

const getBacklogIssues = catchAsync(async (req, res) => {
  if (req.project) {
    const sprints = await sprintService.getBacklogIssues(req.project.id);
    res.status(httpStatus.OK).send({ sprints });
  } else {
    res.status(httpStatus.UNPROCESSABLE_ENTITY).send({ message: sprintMsg.projectIdMissing });
  }
});

const getBoardIssues = catchAsync(async (req, res) => {
  if (req.project) {
    const board = await sprintService.getBoardIssues(req.project.id);
    res.status(httpStatus.OK).send(board);
  } else {
    res.status(httpStatus.UNPROCESSABLE_ENTITY).send({ message: sprintMsg.projectIdMissing });
  }
});

const updateSprintCollection = catchAsync(async (req, res) => {
  const result = await addTaskIdsInSprint();
  res.status(httpStatus.OK).send(result);
});
module.exports = {
  getSprints,
  createNewSprint,
  getBacklogIssues,
  getBoardIssues,
  updateSprintCollection
};
