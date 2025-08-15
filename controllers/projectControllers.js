const Project = require('../model/Project');
const User = require('../model/User');


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
        console.error('Error creating project', err);
        res.status(500).json({ sucess: false, message: 'Failed to create project ', error: err.message });
    }
}

exports.getProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project)
            return res.status(404).json({ sucess: false, message: 'project not found' });
        res.status(200).json({ success: true, message: ' project retrived successfully', data: { project } });
    } catch (err) {
        console.error('getting project error', err);
        res.status(500).json({ sucess: false, message: 'getting project failed', error: err.message });
    }
}

exports.updateProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        
        if (!project)
            return res.status(404).json({ sucess: false, message: 'project not found' });
        res.status(200).json({ success: true, message: 'project updated successfully ' });
    } catch (err) {
        console.error('Error updating project ', err);
        res.status(500).json({ success: false, message: 'failed to update project ', error: err.message });
    }
}

exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project)
            return res.status(404).json({ sucess: false, message: 'project not found' });

        res.status(200).json({ success: true, message: 'project deleted successfully' });
    } catch (err) {
        console.error('deleting project error', err);
        res.status(500).json({ success: false, message: 'Failed to delete project ', error: err.message });
    }
}

exports.getAllProjects = async (req, res) => {
    try {
        const project = await Project.find();
        if (!project)
            return res.status(404).json({ sucess: false, message: 'project not found' });
        res.status(200).json({ success: true, message: 'fetching all project successfully', data: { project } });
    } catch (err) {
        console.error('fetching project error');
        res.status(500).json({ success: false, message: 'fetching project failed', error: err.message });
    }
}


exports.addTeamMemeber = async (req, res) => {
    try {
        const projectId = req.params.id;
        const { userId } = req.body;

        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        const user = await User.findById(userId);
        if (!user)
            return res.status(404).json({ success: false, message: 'user not found' });

        if (project.teamMembers.includes(userId)) {
            return res.status(400).json({ success: false, message: 'User is already a team member' });
        }
        project.teamMembers.push(userId);

        await project.save();
        res.status(200).json({
            success: true,
            message: 'Team member added successfully',
            data: { project },
        });
    }catch (err) {
        // Log the error message
        console.error('Error adding team member:', err);

        // Respond with server error message
        res.status(500).json({ success: false, message: 'Failed to add team member', error: err.message });
    }
}


exports.removeTeamMemeber = async (req, res) => {
    try {
      const project = await Project.findById(req.params.id);
      if (!project) {
        return res
          .status(404)
          .json({ success: false, message: "Project not found" });
      }

      const { userId } = await User.findById(req.body);
      if (!project.teamMembers.includes(userId)) {
        return res
          .status(400)
          .json({ success: false, message: "User is not a team memeber" });
      }
      project.teamMembers = project.teamMembers.filter(
        (memberId) => memberId.toString() !== userId
      );
      await project.save();
      res.status(200).json({
        success: true,
        message: "Team member removed successfully",
        data: { project },
      });
    } catch (err) {
      // Log the error message
      console.error("Error removing team member:", err);

      // Respond with server error message
      res
        .status(500)
        .json({
          success: false,
          message: "Failed to remove team member",
          error: err.message,
        });
    }
}