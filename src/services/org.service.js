const { Organization } = require('../models');
const { Types } = require('mongoose');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

// Create organization
const createOrganization = async (userId, body) => {
  const existingOrg = await Organization.isUserAlreadyOwnAnOrg(userId);
  if (existingOrg) {
    throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, 'User can create only one organization');
  } else {
    return Organization.create(body);
  }
}

// Get organization by id
const getOrganizationById = async (orgId) => Organization.findById(orgId);

// Get organization by userId
const getOrganizationByUserId = async (userId) => Organization.findOne({ adminId: Types.ObjectId(userId) });

module.exports = {
  createOrganization,
  getOrganizationById,
  getOrganizationByUserId,
};
