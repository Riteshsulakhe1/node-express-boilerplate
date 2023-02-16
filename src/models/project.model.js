const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const ProjectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    key: {
        type: String,
        required: true
    },
    adminId: {
        type : mongoose.SchemaTypes.ObjectId,
        required: true
    },
    epics: {
        type: Array,
        default : [],
    },
    lables: {
        type: Array,
        default: []
    },
    orgId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    }
},{timestamp: true});
ProjectSchema.plugin(toJSON);

const ProjectModel = mongoose.model('Project', ProjectSchema);
module.exports = ProjectModel;