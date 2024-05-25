const httpStatus = require('http-status');
const boardColumnsService = require('../services');
const { Types } = require('mongoose');
const catchAsync = require('../utils/catchAsync');
const { taskStatusColMsg } = require('../utils/messages');


const createBoardColumn = catchAsync(async (req, res) => {
    if (req.project) {

    }
});