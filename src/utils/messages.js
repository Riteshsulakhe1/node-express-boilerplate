const taskMsg = {
    created: 'Task created successfully',
    updated: 'Task updated successfully',
    deleted: 'Task deleted successfully',
    cloned: 'Task cloned successfully',
    linked: 'Task linked successfully',
    blocked: 'Task blocked successfully'
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
    idRequired: 'Project id is required'
};

const orgMsg = {
    created: 'Organization created successfully'
}

module.exports = {
    taskMsg,
    storyMsg,
    projectMsg,
    orgMsg
};