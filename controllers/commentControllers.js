const Comment = require('../model/Comment');

exports.createComment = async (req, res) => {
    try {
        const { text, author, task, likes } = req.body;
        if (!text || !author || !task || !likes) {
            return res.status(401).json({ success: false, message: 'Missing required field' });
        }
        const comment = new Comment({ text, author, task, likes });
        await comment.save();
        res.status(201).json({ success: true, message: 'comment created successfully', data: { comment } });
    } catch (err) {
        console.error('error to create comment', err);
        res.status(500).json({ success: false, message: 'failed to create comment', error: err.message });
    }
}

exports.getComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment)
            return res.status(404).json({ success: false, message: 'comment not found' });
        res.status(200).json({ success: true, message: 'fetched comment successfully', data: { comment } });
    } catch (err) {
        console.error('error to fetch message');
        res.status(500).json({ success: false, message: 'failed to fetch comment', error: err.message });
    }
}

exports.getAllComments = async (req, res) => {
    try {
        const comment = await Comment.find();
        if (!comment)
            return res.status(404).json({ success: false, message: 'comment not found' });

        res.status(200).json({ success: true, message: 'fetched comment successfully', data: { comment } });
    } catch (err) {
        console.error('error to fetch comment', err);
        res.status(500).json({ success: false, message: 'failed to fetch comment', error: err.message });
    }
}

exports.updateComment = async (req, res) => {
    try {
        const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if (!comment)
            return res.status(404).json({ success: false, message: 'comment not found' });

        await comment.save();
        res.status(201).json({ success: true, message: 'comment updated', data: { comment } });
    } catch (err) {
        console.error('error to update comment', err);
        res.status(500).json({ success: false, message: 'failed to update comment', error: err.message });
    }
}

exports.deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);
        if (!comment)
            return res.status(404).json({ success: false, message: 'comment not found' });

        res.status(201).json({ success: true, message: 'comment deleted', data: { comment } });
    } catch (err) {
        console.error("error to delete comment", err);
        res
          .status(500)
          .json({
            success: false,
            message: "failed to delete comment",
            error: err.message,
          });
    }
}

