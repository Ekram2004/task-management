const Task = require('../model/Task');

//create a new task
exports.createTask = async (req, res) => {
    try {
        const { title, description, status, priority, assignedTo, project } = req.body;
        if (!title || !description || !status || !priority || !assignedTo || !project) {
            res.status(401).json({ success: false, message: 'Missing required fields' });
        }
        const task = new Task({ title, description, status, priority, assignedTo, project });
        await task.save();
        res.status(201).json({ success: true, message: 'task created successfully' });
    } catch (err) {
        console.error('creating task error', err);
        res.status(500).json({ success: false, message: 'creating task failed', error: err.message });
    }
}

exports.getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task)
            return res.status(404).json({ success: false, message: 'task not found' });
        res.status(200).json({ success: true,message:'Task retrieved successfully' ,data: { task } });
    } catch (err) {
        console.error('fetching task error', err);
        res.status(500).json({ success: false, message: 'fetching task failed', error: err.message });
    }
}

exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!task)
            return res.status(404).json({ success: false, message: 'Task not found' });


        res.status(200).json({ success: 'true', message: 'task updated successfullly', data: { task } });
    } catch (err) {
        console.error('updating task error', err);
        res.status(500).json({ success: 'true', message: 'updating task failed', error: err.message });
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task)
          return res
            .status(404)
            .json({ success: false, message: "Task not found" });

        res.status(200).json({ success: true, message: 'task deleted successfully', data: { task } });
    }
    catch (err) {
        console.error('deleting task error', err);
        res.status(500).json({ success: true, message: 'deleting task failed', error: err.message });
    }
}

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        if (!tasks)
            return res.status(404).json({sucess:false, message:'task not found'})
        res.status(200).json({ success: true, message: 'Task retrived successfully', data: { tasks } });
    } catch (err) {
        console.error('geting all tasks error', err);
        res.status(500).json({ success: false, message: 'getting all tasks  falied', error: err.message });
    }
}

