const httpStatus = require('http-status');
const { Project } = require('../models');
const ApiError = require('../utils/ApiError');
const pick = require('../utils/pick');

const getProjectByKeyAndOrgId = async(projectKey, orgId)=>(
    Project.findOne({key: projectKey, orgId})
);

const createProject = async (body) => Project.create(body);

const getProjectById = async (projectId) => Project.findById(projectId);

const updateProject = async (projectId, body) => {
    const project = await getProjectById(projectId);
    if(project){
        const updatedData = pick(body, ['name', 'key', 'epics', 'labels']);
        Object.assign(project, updatedData);
        await project.save();
        return project;
    } else {
        throw new ApiError(httpStatus, 'Project not found');
    }
};


module.exports = {
  createProject,
  updateProject,
  getProjectById,
  getProjectByKeyAndOrgId
};
