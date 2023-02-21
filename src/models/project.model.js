const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

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
    labels: {
        type: Array,
        default: []
    },
    orgId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    }
},{timestamps: true});
ProjectSchema.plugin(toJSON);
ProjectSchema.plugin(paginate);

const ProjectModel = mongoose.model('Project', ProjectSchema);
module.exports = ProjectModel;