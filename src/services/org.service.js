const {Organization} = require('../models');

// Create organization
const createOrganization = async(body)=> Organization.create(body);

// Get organization by id
const getOrganizationById = async(orgId)=> Organization.findById(orgId);

module.exports={
    createOrganization,
    getOrganizationById
}