const { taskStatus } = require('../config/task');
const { BoardColumn } = require('../models');
const ApiError = require('../utils/ApiError');
const { Types } = require('mongoose');

const getBoardColumnById = async (statusId) => BoardColumn.findById(statusId);

const addDefaultBoardColumns = async (projectId) => {
    const taskStatusDocs = Object.values(taskStatus).map((status, index) => ({
        projectId,
        name: status,
        index,
        isInitial: index === 0
    }));
    return BoardColumn.insertMany(taskStatusDocs);
};

const createBoardColumn = async (body) => BoardColumn.create(body);

const updateBoardColumnName = async (statusId, name) => {
    const taskStatusDoc = await getBoardColumnById(statusId);
    if (!taskStatusDoc) {
        throw new ApiError('Task status column not found.');
    } else if (taskStatusDoc.name === name) {
        throw new ApiError('Column with same name already exist. Please choose another name.');
    } else {
        taskStatusDoc.name = name;
        await taskStatusDoc.save();
        return taskStatusDoc;
    }
}

const getBoardColumnsByProjectId = async (projectId) => {
    const columnDocs = await BoardColumn.find({ projectId: Types.ObjectId(projectId) });
    if (!columnDocs) {
        throw new ApiError('Board columns not found for projectId');
    } else {
        return columnDocs;
    }
};

const getInitialColumnByProjectId = async (projectId) => {
    const column = await BoardColumn.findOne({ projectId: Types.ObjectId(projectId), isInitial: true });
    if (!column) {
        throw new ApiError('Initial Board columns not found for projectId');
    } else {
        return column;
    }
};

const deleteColumnById = async (columnId) => {
    // While deleting , update the index of other columns
    // For delete task status on UI show modal to move all tasks to other taskStatusCol
};

module.exports = {
    addDefaultBoardColumns,
    getBoardColumnById,
    createBoardColumn,
    updateBoardColumnName,
    getBoardColumnsByProjectId,
    getInitialColumnByProjectId
}