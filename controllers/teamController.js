const Team = require('../model/Team');
const User = require('../model/User');

exports.createTeam = async (req, res) => {
    try {
        const { name, members, admin } = req.body;
        if (!name || !members || !admin)
            return res.status(401).json({ success: false, message: 'Missing required filed' });
        const team = new Team({ name, members, admin });
        await team.save();
        res.status(201).json({ success: true, message: 'team created successfully' });
    } catch (err) {
        console.error('error creating team', err);
        res.status(500).json({ success: false, message: 'failed to create team', error: err.message });
    }
}

exports.getTeam = async (req, res) => {
    try {
        const team = await Team.findById(req.params.id);
        if (!team)
            return res.status(404).json({ success: false, message: 'team not found ' });
        res.status(200).json({ success: true, message: 'retrive team successfully', data: { team } });
    } catch (err) {
        console.error('error to retrive team', err);
        res.status(500).json({ success: false, message: 'failed to retrive team', error: err.message });
    }
}

exports.updateTeam = async (req, res) => {
    try {
        const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!team)
            return res.status(404).json({ success: false, message: 'team not found ' });
        res.status(200).json({ success: true, message: 'team updated successfully', data: { team } });
    } catch (err) {
        console.error('error updating team', err);
        res.status(500).json({ success: false, message: 'failed to update team', error: err.message });
    }
}

exports.deleteTeam = async (req, res) => {
    try {
        const team = await Team.findByIdAndDelete(req.params.id);
        if (!team)
            return res.status(404).json({ success: false, message: 'team not found ' });
        res.status(200).json({ success: true, message: 'team deleted successfully' });
    } catch (err) {
        console.error('error deleting team', err);
        res.status(500).json({ success: false, message: 'failed to delete team', error: err.message });
    }
}

exports.getAllTeam = async (req, res) => {
    try {
        const team = await Team.find();
        if (!team)
            return res.status(404).json({ success: false, message: 'team not found ' });

        res.status(200).json({ success: true, message: 'team retrived successfully', data: { team } });
    } catch (err) {
        console.error('error retriving team');
        res.status(500).json({ sucess: false, message: 'failed to retrive team', error: err.message });
    }
}

exports.addMemeber = async (req, res) => {
    try {
        const teamId = req.params.id;
        const {userId} = req.body;
        const team = await Team.findById(teamId);
        if (!teamId)
          return res
            .status(404)
            .json({ success: false, message: "team not found" });
        const user = await User.findById(userId);

        
        if (team.members.includes(userId)) {
            res.status(400).json({ success: false, message: 'member is already added' });
        }
        team.members.push(userId);
        await team.save();
        res.status(201).json({ success: true, message: 'member added successfully' , data:{team}});
    } catch (err) {
        console.error("error adding memeber ", err);
        res.status(500).json({ success: false, message: 'failed to add member', error: err.message });
    }
}

exports.removeMemeber = async (req, res) => {
    try {
        const teamId = req.params.id;
        const { userId } = req.body;

        const team = await Team.findById(teamId);
        if (!team)
          return res
            .status(404)
                .json({ success: false, message: "team not found" });
        team.memebers = team.members

        const user = await User.findById(req.body);
        
    } catch {
        console.error('error removing memeber', err);
        res.status(500).json({ success: true, message: 'failed to remove member' });
    }
}