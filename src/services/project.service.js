const { Project } = require('../models');

const createProject = async (body) => Project.create(body);

const updateProject = async (body) => Project.updateOne(body);

const getProjectById = async (body) => Project.findById(projectId);

module.exports = {
  createProject,
  updateProject,
  getProjectById,
};
