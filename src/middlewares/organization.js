const httpStatus = require('http-status');
const orgService = require('../services/org.service');
const { projectMsg } = require('../utils/messages');

const getUserOrg = async(req, res, next)=>{
    const org = await orgService.getOrganizationByUserId(req.user?.id);
    if(org?.id){
        req.organization = org;
        next();
    } else {
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send({message: projectMsg.unAuth});
    }
};

module.exports = {
    getUserOrg
};