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
  const sprintName = `${projectKey} ${sprintSuffix} ${sprintCount + 1}`;
  body.name = sprintName;
  const sprint = await Sprint.create(body);
  // Replace id with _id field 
  const modifiedSprint = {
    ...sprint.toObject(),
    _id: sprint.id
  };
  delete modifiedSprint.id;
  return modifiedSprint;
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
      $sort: { 'createdAt': -1 }
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
              _id: '$$task._id',
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

const getBoardIssues = async (projectId) => {
  const board = await Sprint.aggregate([
    // Find the board sprint with status 'In Progress' & request projectId
    {
      $match: {
        projectId: Types.ObjectId(projectId),
        status: {
          $eq: Status.IN_PROGRESS,
        },
      },
    },
    // Project the required fields from board sprint
    {
      $project: {
        _id: 1,
        name: 1,
        projectId: 1,
        durationInWeeks: 1,
        startDate: 1,
        endDate: 1,
        taskIds: 1
      },
    },
    // Find the tasks for board sprint
    {
      $lookup: {
        from: "tasks",
        let: {
          taskIds: "$taskIds",
        },
        pipeline: [
          // by matching sprint.id with task sprintId
          {
            $match: {
              $expr: {
                $in: ["$_id", "$$taskIds"],
              },
            },
          },
          // Project the required fields from task for board
          {
            $project: {
              _id: 1,
              title: 1,
              type: 1,
              status: 1,
              assignedTo: 1,
              flag: 1,
            },
          },
          // Group all the tasks according to their status i.e board columns id
          {
            $group: {
              _id: "$status",
              tasks: {
                $push: "$$ROOT",
              },
            },
          },
        ],
        as: "taskGroupByStatus",
      },
    },
    // Find board columns by projectId and select the required fields from column & sort by index
    {
      $lookup: {
        from: "boardcolumns",
        let: {
          projectId: "$projectId",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$projectId", "$$projectId"],
              },
            },
          },
          {
            $project: {
              _id: 1,
              name: 1,
              index: 1,
              isInitial: 1,
            },
          },
          {
            $sort: {
              index: 1,
            },
          },
        ],
        as: "boardColumns",
      },
    },
    // Now merge the tasks array from 'boards' into the columns and store it in 'board' array
    {
      $addFields: {
        board: {
          $map: {
            input: "$boardColumns",
            as: "column",
            in: {
              $mergeObjects: [
                "$$column",
                { 'tasks': [] },
                {
                  $arrayElemAt: [
                    {
                      $filter: {
                        input: "$taskGroupByStatus",
                        as: "statusGroupItem",
                        cond: {
                          $eq: [
                            "$$statusGroupItem._id",
                            "$$column._id",
                          ],
                        },
                      },
                    },
                    0,
                  ],
                },
              ],
            },
          },
        },
      },
    },
    // Remove the 'columns' & 'boards' array because now we have the output in 'board' along with the column details & tasks
    {
      $project: {
        boardColumns: 0,
        taskGroupByStatus: 0,
        taskIds: 0
      },
    },
  ]).exec();
  return board;
};

const updateTaskIdInSprint = async (sprintId, taskId) => {
  const sprint = await Sprint.updateOne(
    { _id: Types.ObjectId(sprintId) },
    { $push: { taskIds: taskId } }
  );
  return sprint;
};

const getSprintListByProjectId = async (projectId) => {
  return await Sprint.find({ projectId: Types.ObjectId(projectId) }, { _id: 1, name: 1 });
};

module.exports = {
  createBacklogSprint,
  createEmptySprint,
  getSprintsByProjectId,
  getBacklogIssues,
  getBoardIssues,
  updateTaskIdInSprint,
  getSprintListByProjectId
};
