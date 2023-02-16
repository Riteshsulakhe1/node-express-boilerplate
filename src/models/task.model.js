const mongoose = require('mongoose');
const { toJSON } = require('./plugins');
const { taskType, taskStatus, taskPriority } = require('../config/task');

const TaskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    description: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      required: true,
      default: taskType.STORY,
      enum: [...Object.values(taskType)],
    },
    status: {
      type: String,
      enum: [...Object.values(taskStatus)],
      default: taskStatus.TO_DO,
    },
    priority: {
      type: String,
      enum: [...Object.values(taskPriority)],
      default: taskPriority.MEDIUM,
    },
    reportedBy: {
      type: String,
      ref: 'User',
    },
    assignedTo: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      default: '',
    },
    assignedBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      default: '',
    },
    flag: {
      type: Boolean,
      default: false,
    },
    parentId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Task',
      default: '',
    },
    startDate:{
        type: Date,
        default: new Date(),
    },
    endDate:{
        type: Date,
        default: new Date(),
    },
    estimateInDays: {
        type: Number,
        default: 0
    },
    attachments: {
        type: Array,
        default: [] // // Will implement this feature later
    },
    linkedIssues: {
        type: Array,
        default: [] // // Will implement this feature later
        // eg [{type: '', taskId: ''}] // type refere from config/task => linkedIssueType
    }
  },
  { timestamps: true }
);

TaskSchema.plugin(toJSON);

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;
