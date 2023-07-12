const { Sprint, Task } = require('../models');
const { defaultSprintName, sprintSuffix, Status } = require('../config/sprint');
const { Types } = require('mongoose');
const createBacklogSprint = async (projectId) => {
  const body = {
    name: defaultSprintName,
    projectId,
    isDefault: true,
  };
  const sprint = await Sprint.create(body);
  return sprint;
};

const createEmptySprint = async (body, projectKey) => {
  const sprintCount = await getTotalSprintCount(body.projectId);
  console.log('sprintCount', sprintCount);
  const sprintName = `${projectKey} ${sprintSuffix} ${sprintCount + 1}`;
  body.name = sprintName;
  const sprint = await Sprint.create(body);
  return sprint;
};

const getTotalSprintCount = async (projectId) => Sprint.countDocuments({ projectId, isDefault: false });

const getSprintsByProjectId = async (projectId) => {
  const sprints = await Sprint.find({ projectId, status: { $ne: Status.COMPLETED } });
  const backlogSprint = sprints.shift();
  sprints.push(backlogSprint);
  return sprints;
};

const getBacklogIssues = async (projectId) => {
  const sprints = await Sprint.aggregate([
    {
      $match: {
        projectId: Types.ObjectId(projectId),
        status: { $ne: Status.COMPLETED },
      },
    },
    {
      $lookup: {
        from: 'tasks',
        localField: '_id',
        foreignField: 'sprintId',
        as: 'tasks',
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        status: 1,
        startDate: 1,
        endDate: 1,
        isDefault: 1,
        projectId: 1,
        tasks: {
          $map: {
            input: '$tasks',
            as: 'task',
            in: {
              id: '$$task._id',
              title: '$$task.title',
              status: '$$task.status',
              type: '$$task.type',
              assignedTo: '$$task.assignedTo',
              flag: '$$task.flag',
            },
          },
        },
      },
    },
  ]).exec();
  return sprints;
};

module.exports = {
  createBacklogSprint,
  createEmptySprint,
  getSprintsByProjectId,
  getBacklogIssues,
};
