const httpStatus = require('http-status');
const { sprintService, taskService } = require('../services');
const catchAsync = require('../utils/catchAsync');
const { sprintMsg } = require('../utils/messages');

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

module.exports = {
  getSprints,
  createNewSprint,
  getBacklogIssues,
};
