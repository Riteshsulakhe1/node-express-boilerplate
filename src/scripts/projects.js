const { Types } = require("mongoose");
const httpStatus = require('http-status');
const _async = require('async');
const { Project, Task, BoardColumn } = require('../models');
const ApiError = require('../utils/ApiError');
const { boardColumnsService, taskService } = require('../services');
const catchAsync = require('../utils/catchAsync');

// const createDefaultBoardColumnForOldProjects = catchAsync(async (req,res)=>{
//     const orgId = req?.organization?._id || req.body.orgId;
//     if (req.user && orgId){
//         const projects = await Project.find({orgId: ObjectId(orgId)});

//     } else {

//     }
// });


const createDefaultBoardColumnsForProject = async (req, res) => {
    console.log('createDefaultBoardColumnsForProject$$$');
    if (req.user && req.project) {
        const projectId = req.project._id;
        console.log('projectId==>', projectId);
        let boardColumns;
        // Check if board columns exists
        boardColumns = await boardColumnsService.getBoardColumnsByProjectId(projectId);
        // Otherwise create default board columns
        if (boardColumns.length === 0) {
            boardColumns = await boardColumnsService.addDefaultBoardColumns(projectId);
        }
        console.log('boardColumns==>', boardColumns);
        boardColumns.forEach(async (column) => {
            try {
                const tasks = await Task.updateMany({ projectId, }, { $set: { status: Types.ObjectId(column.id) } });
                console.log('tasks==>', tasks);
            } catch (err) {
                console.log('err in task find==>', err);
            }
        });
        res.status(200).send({ msg: 'DONEEEE' });
    }
};

module.exports = {
    createDefaultBoardColumnsForProject
}