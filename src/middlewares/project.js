const { projectMsg } = require('../utils/messages');
const httpStatus = require('http-status');
const { projectService } = require('../services');

const getProjectById = async (req, res, next) => {
  if (req.user?.id) {
    const projectId = req.query.projectId || req.params.projectId || req.body.projectId;
    const project = await projectService.getProjectById(projectId);
    req.project = project;
    next();
  } else {
    res.status(httpStatus.BAD_REQUEST).send({ message: projectMsg.idRequired });
  }
};

module.exports = {
  getProjectById,
};
