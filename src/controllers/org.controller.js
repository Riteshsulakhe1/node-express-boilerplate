const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { Types } = require('mongoose');
const orgService = require('../services/org.service');
const orgMsg = require('../utils/messages').orgMsg;
const userService = require('../services/user.service');

const create = catchAsync(async (req, res) => {
    req.body.adminId = Types.ObjectId(req.user?.id);
    const userId = Types.ObjectId(req.user.id);
    const org = await orgService.createOrganization(userId, req.body);
    await userService.updateUserById(userId, { orgId: org.id });
    res.status(httpStatus.CREATED).send({ message: orgMsg.created, org });
});

module.exports = {
    create
};