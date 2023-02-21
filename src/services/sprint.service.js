const {Sprint} = require('../models');
const {defaultSprintName, sprintSuffix} = require('../config/sprint');

const createBacklogSprint = async(projectId)=>{
    const body = {
        name: defaultSprintName,
        projectId,
        isDefault: true
    };
    const sprint = await Sprint.create(body);
    return sprint;
};

const createEmptySprint = async(body, projectKey)=>{
    const sprintCount = await getTotalSprintCount(body.projectId);
    const sprintName = `${projectKey} ${sprintSuffix} ${sprintCount+1}`;
    body.name = sprintName;
    const sprint = await Sprint.create(body);
    return sprint;
};

const getTotalSprintCount = async (projectId)=>(
    Sprint.countDocuments({projectId, isDefault: false})
);

module.exports = {
    createBacklogSprint,
    createEmptySprint
};