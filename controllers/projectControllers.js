const Project = require('../model/Project');

exports.createProject = async (req, res) => {
    try {
        const { name, description, endDate, status, teamMembers } = req.body;
        if (!name || !description || !endDate || !status || !teamMembers) {
            res.status(401).json({ success: true, message: 'Missing required field' });
        }
        const project = new Project({ name, description, endDate, status, teamMembers });
        await project.save();
        res.status(201).json({ success: true, message: 'project created successfully', data: { project } });
    } catch (err) {
        console.error('creating project error', err);
        res.status(500).json({ sucess: false, message: 'creating project failed', error: err.message });
    }
}

exports.getProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project)
            return res.status(404).json({ sucess: false, message: 'project not found' });
        res.status(201).json({ success: true, message: 'getting project successfull', data: { project } });
    } catch (err) {
        console.error('getting project error', err);
        res.status(500).json({ sucess: false, message: 'getting project failed', error: err.message });
    }
}

exports.updateProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if (!project)
            return res.status(404).json({ sucess: false, message: 'project not found' });
        res.status(201).json({success:true, message:'project '})
    }
}