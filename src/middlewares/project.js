const {projectMsg} = require('../utils/messages');
const httpStatus = require('http-status');
const {projectService} = require('../services');

const getProjectById = async(req, res, next)=>{
    if(req.user?.id){
        const project = await projectService.getProjectById(req.params.projectId);
        req.project = project;
        next();
    } else {
        res.status(httpStatus.BAD_REQUEST).send({message: projectMsg.idRequired});
    }
};

module.exports = {
    getProjectById
}