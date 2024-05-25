const taskMsg = {
  created: 'Task created successfully',
  updated: 'Task updated successfully',
  deleted: 'Task deleted successfully',
  cloned: 'Task cloned successfully',
  linked: 'Task linked successfully',
  blocked: 'Task blocked successfully',
  statusUpdated: 'Task status updated successfully'
};

const storyMsg = {
  created: 'Story created successfully',
  updated: 'Story updated successfully',
  deleted: 'Story deleted successfully',
  completed: 'Story completed successfully',
};

const projectMsg = {
  created: 'Project created successfully',
  updated: 'Project settings updated successfully',
  unAuth: "you don't have access to create project. Please contact your admin",
  keyAlreadyExist: 'Project key is already exist. Please use another one',
  idRequired: 'Project id is required',
  notFound: 'Project not found for the provided id'
};

const orgMsg = {
  created: 'Organization created successfully',
};

const sprintMsg = {
  projectIdMissing: 'Project id is required',
  created: 'New sprint created successfully',
  updated: 'Sprint updated successfully',
  deleted: 'Sprint deleted successfully',
  started: 'Sprint started successfully',
  completed: 'Sprint completed successfully',
};

const taskStatusColMsg = {
  projectIdMissing: 'Please select any project. Project id is required',
  created: 'New task status column created successfully',
  updated: 'Task status column name updated successfully',
  deleted: 'Task status column deleted successfully and tasks moved to another column.',
}

module.exports = {
  taskMsg,
  storyMsg,
  projectMsg,
  orgMsg,
  sprintMsg,
  taskStatusColMsg
};
