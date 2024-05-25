const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const boardColumns = mongoose.Schema({
    projectId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    index: {
        type: Number,
        required: true
    },
    isInitial: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    }
);

boardColumns.plugin(toJSON);

const BoardColumn = mongoose.model('BoardColumn', boardColumns);
module.exports = BoardColumn;