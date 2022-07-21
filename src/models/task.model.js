const mongoose =require('mongoose');
const {toJSON} =  require('./plugins');
const {taskType,taskStatus,taskPriority} =require('../config/task');

const TaskSchema = mongoose.Schema({
    title:{
        type: String,
        required:true,
        index:true
    },
    description:{
        type:String,
        default: ''
    },
    type: {
        type:String,
        required:true,
        default: taskType.TASK,
        enum: [taskType.TASK,taskType.BUG]
    },
    status: {
        type:String,
        required:true,
        enum:[...Object.values(taskStatus)],
        default: taskStatus.TO_DO
    },
    priority: {
        type:String,
        // required: true,
        enum: [...Object.values(taskPriority)],
        default: taskPriority.MEDIUM
    },
    createdBy:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
    },
    assignedTo:{
        type: String,
        // mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        default:''
    },
    assignedBy:{
        type: String,
        // mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        default:''
    }
},{timestamps: true});

TaskSchema.plugin(toJSON);

const Task = mongoose.model('Task',TaskSchema);
module.exports = Task;