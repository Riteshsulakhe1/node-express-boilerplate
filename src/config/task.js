const taskType = {
  TASK: 'task',
  BUG: 'bug',
  STORY: 'story',
  SUB_TASK: 'sub-task',
};

const taskStatus = {
  TO_DO: 'To Do',
  IN_PROGRESS: 'In Progress',
  READY_FOR_TESTING: 'Ready for testing',
  DONE: 'Done',
};

const taskPriority = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
};

const epicInitials = {
  id: '',
  name: '',
};

const labelInitials = {
  id: '',
  name: '',
};

const linkedIssueType ={
    clones: 'clones',
    clonedBy: 'is cloned by',
    duplicates: 'duplicates',
    duplicatedBy: 'is duplicated by',
    blocks: 'blocks',
    blockedBy: 'is blocked by'
};

module.exports = {
  taskType,
  taskStatus,
  taskPriority,
};
