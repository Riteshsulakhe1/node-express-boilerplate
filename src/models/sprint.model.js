const mongoose = require('mongoose');
const { toJSON } = require('./plugins');
import {Status, } from '../config/sprint';

const SprintSchema = mongoose.Schema({
    name: {
        type : String,
        required : true
    },
    durationInWeeks: {
        type: Number,
        default: 1,
        enum: [1,2,3,4]
    },
    startDate: {
        type: null | Date,
        default: null
    },
    endDate: {
        type: null | Date,
        default: null
    },
    status: {
        type: String,
        enum: [...Object.values(Status)],
        default : Status.PENDING
    },
    completedAt: {
        type: null | Date,
        default: null
    }
}, {timestamp: true});

SprintSchema.plugin(toJSON);
const SprintModel = mongoose.model('Sprint', SprintSchema);
module.exports = SprintModel;