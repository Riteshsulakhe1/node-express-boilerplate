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
  //   const sprints = await getSprintsByProjectId(projectId);
  //   const sprintIds = sprints.map((sprint) => sprint.id);
  //   Task.aggregate({
  //     $match: { sprintId: { $in: sprintIds } },
  //   });

  //   {
  //     $lookup: {
  //       from: 'statistic',
  //       localField: '_id',
  //       foreignField: 'driverId',
  //       as: 'driver',
  //     },
  //   },
  //   {
  //     $unwind: {
  //       path: '$driver',
  //       preserveNullAndEmptyArrays: true,
  //     },
  //   },
  //   {
  //     $project: {
  //       driver: {
  //         $ifNull: [{
  //           $concat: ['$driver.firstName', ' ', '$driver.lastName']
  //         }, 'Technical']
  //       },
  //       entityId: 1,
  //       message: 1,
  //       meta: 1,
  //       createdAt: 1,
  //     },
  //   },
  //   {
  //     $facet: {
  //       total: [{
  //         $count: 'createdAt'
  //       }],
  //       data: [{
  //         $addFields: {
  //           _id: '$_id'
  //         }
  //       }],
  //     },
  //   },
  //   {
  //     $unwind: '$total'
  //   },
  //   {
  //     $project: {
  //       data: {
  //         $slice: ['$data', skip, {
  //           $ifNull: [limit, '$total.createdAt']
  //         }]
  //       },
  //       meta: {
  //         total: '$total.createdAt',
  //         limit: {
  //           $literal: limit
  //         },
  //         page: {
  //           $literal: ((skip / limit) + 1)
  //         },
  //         pages: {
  //           $ceil: {
  //             $divide: ['$total.createdAt', limit]
  //           }
  //         },
  //       },
  //     },
  const limit = 5;
  const skip = 0;
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
        // localField: 'id',
        // foreignField: 'sprintId',
        let: { sprintId: { $toObjectId: '$id' } },
        as: 'tasks',
        pipeline: [
          {
            $match: {
              $expr: {
                sprintId: '$$sprintId',
              },
            },
          },
          {
            $project: {
              id: 1,
              title: 1,
              type: 1,
              status: 1,
              assignedTo: 1,
              projectId: 1,
              sprintId: 1,
              index: 1,
            },
          },
        ],
      },
    },
    {
      $replaceRoot: {
        newRoot: {},
      },
    },
    // {
    //   $project: {
    //     title: 1,
    //     type: 1,
    //     status: 1,
    //     assignedTo: 1,
    //     projectId: 1,
    //     sprintId: 1,
    //     index: 1,
    //   },
    // },
    // {
    //   $project: {
    //     data: {
    //       $slice: ['$tasks', skip, limit],
    //     },
    //     meta: {
    //       total: '$tasks.id',
    //       limit: {
    //         $literal: limit,
    //       },
    //       page: {
    //         $literal: skip / limit + 1,
    //       },
    //       pages: {
    //         $ceil: {
    //           $divide: ['$tasks.id', limit],
    //         },
    //       },
    //     },
    //   },
    // },
  ]).exec();
  return sprints;
};

module.exports = {
  createBacklogSprint,
  createEmptySprint,
  getSprintsByProjectId,
  getBacklogIssues,
};
