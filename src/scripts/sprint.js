const { Sprint } = require('../models');
const { Types } = require("mongoose");

const addTaskIdsInSprint = async () => {
    const sprintDetails = await Sprint.aggregate([
        [
            {
                $match: {} // get all sprint docs
            },
            {
                $project:

                {
                    _id: 1
                }
            },
            {
                $addFields:
                {
                    taskIds: []
                }
            },
            {
                $lookup: {
                    from: "tasks",
                    let: {
                        sprintId: "$_id"
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ["$sprintId", "$$sprintId"]
                                }
                            }
                        },
                        {
                            $project: {
                                _id: 1
                            }
                        }
                    ],
                    as: "taskIds"
                }
            },
            {
                $project:
                {
                    _id: 1,
                    taskIds: {
                        $map: {
                            input: "$taskIds",
                            as: "task",
                            in: "$$task._id"
                        }
                    }
                }
            }
        ]
    ]);
    const bulkOps = [];
    // create bulk operation array
    sprintDetails.forEach(sprint => {
        bulkOps.push({
            updateOne: {
                filter: { _id: sprint._id },
                update: { $set: { taskIds: sprint.taskIds.map(id => id) } }
            }
        });
    });

    console.log('bulkOps data==>', bulkOps[0]);
    const result = await Sprint.bulkWrite(bulkOps);
    return result;
    // return bulkOps;
};

module.exports = {
    addTaskIdsInSprint
}