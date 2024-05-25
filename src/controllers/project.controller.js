const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { Types } = require('mongoose');
const projectService = require('../services/project.service');
const { sprintService, boardColumnsService } = require('../services');
const projectMsg = require('../utils/messages').projectMsg;
const userRoles = require('../config/roles').userRoles;
const projectScript = require('../scripts/projects');

const createProject = catchAsync(async (req, res) => {
  // check if user org admin
  if (req.organization) {
    // Check project key is not already used in this organization
    const orgId = req.organization.id;
    const isProjectKeyExist = await projectService.getProjectByKeyAndOrgId(req.body.key, orgId);
    if (isProjectKeyExist) {
      res.status(httpStatus.CONFLICT).send({ message: projectMsg.keyAlreadyExist });
    } else {
      // Create project
      req.body.adminId = req.user.id;
      req.body.orgId = orgId;
      const project = await projectService.createProject(req.body);
      // Create default Backlog sprint
      await createBacklogSprint(project.id);
      // Create default task status columns for Board
      await createDefaultBoardColumns(project.id);
      res.status(httpStatus.CREATED).send({ message: projectMsg.created, project });
    }
  } else {
    res.status(httpStatus.UNPROCESSABLE_ENTITY).send({ message: projectMsg.unAuth });
  }
});

const createBacklogSprint = async (projectId) => sprintService.createBacklogSprint(projectId);
const createDefaultBoardColumns = async (projectId) => boardColumnsService.addDefaultBoardColumns(projectId);

const updateProject = catchAsync(async (req, res) => {
  if (req.organization) {
    const project = await projectService.updateProject(req.params.projectId, req.body);
    res.status(httpStatus.OK).send({ message: projectMsg.updated, project });
  } else {
    res.status(httpStatus.UNPROCESSABLE_ENTITY).send({ message: projectMsg.unAuth });
  }
});

const getProjects = catchAsync(async (req, res) => {
  if (req.organization) {
    const filter = { orgId: req.organization.id };
    const options = {
      sortBy: 'createdAt',
      limit: req.query.pageSize,
      page: req.query.page,
    };
    const projects = await projectService.getProjects(filter, options);
    res.status(httpStatus.OK).send({ projects });
  } else {
    res.status(httpStatus.UNPROCESSABLE_ENTITY).send({ message: projectMsg.unAuth });
  }
});


const getProjectTaskStatusList = catchAsync(async (req, res) => {
  if (req.project) {
    const list = await boardColumnsService.getBoardColumnsByProjectId(req.params.projectId);
    res.status(200).send({ taskStatusList: list });
  } else {
    res.status(httpStatus.NOT_FOUND).send({ message: projectMsg.notFound });
  }
});

const runBoardColumnScript = catchAsync(async (req, res, next) => {
  projectScript.createDefaultBoardColumnsForProject(req, res);
});

module.exports = {
  createProject,
  updateProject,
  getProjects,
  runBoardColumnScript,
  getProjectTaskStatusList
};
