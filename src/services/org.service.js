const { Organization } = require('../models');
const { Types } = require('mongoose');

// Create organization
const createOrganization = async (body) => Organization.create(body);

// Get organization by id
const getOrganizationById = async (orgId) => Organization.findById(orgId);

// Get organization by userId
const getOrganizationByUserId = async (userId) => Organization.findOne({ adminId: Types.ObjectId(userId) });

module.exports = {
  createOrganization,
  getOrganizationById,
  getOrganizationByUserId,
};
