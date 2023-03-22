const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { Status } = require('../config/sprint');

const SprintSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    durationInWeeks: {
      type: Number,
      default: 1,
      required: false,
      enum: [1, 2, 3, 4],
    },
    startDate: {
      type: Date,
      default: null,
    },
    endDate: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: [...Object.values(Status)],
      default: Status.PENDING,
    },
    completedAt: {
      type: Date,
      default: null,
    },
    projectId: {
      type: mongoose.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

SprintSchema.plugin(toJSON);
SprintSchema.plugin(paginate);
const SprintModel = mongoose.model('Sprint', SprintSchema);
module.exports = SprintModel;
