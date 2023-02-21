const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
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
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true
    },
    assignedTo: {
      type: String,
      ref: 'User',
      required: false,
      default: ''
    },
    assignedBy: {
      type: String,
      ref: 'User',
      required: false,
      default: ''
    },
    flag: {
      type: Boolean,
      default: false,
    },
    parentId: {
      type: String,
      ref: 'Task',
      required: false,
      default: ''
    },
    startDate: {
      type: Date,
      default: null,
    },
    endDate: {
      type: Date,
      default: null,
    },
    estimateInDays: {
      type: Number,
      default: 0,
    },
    attachments: {
      type: Array,
      default: [], // // Will implement this feature later
    },
    linkedIssues: {
      type: Array,
      default: [], // // Will implement this feature later
      // eg [{type: '', taskId: ''}] // type refere from config/task => linkedIssueType
    },
    projectId: {
      type: mongoose.SchemaTypes.ObjectId,
      required : true
    },
    sprintId: {}
  },
  { timestamps: true }
);

TaskSchema.plugin(toJSON);
TaskSchema.plugin(paginate);

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;
