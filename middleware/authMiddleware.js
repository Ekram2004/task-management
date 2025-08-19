const jwt = require('jsonwebtoken');

let verify = (req, res, next) => {
    const authHeaders = req.headers.authorization;
    if (!authHeaders || !authHeaders.startsWith('Bearer')) {
        return res.status(401).json({ success: false, message: 'Unauthorized access' });
    }
    const token = authHeaders.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body = decoded;
        next();
    } catch (err) {
        console.error('unauthorized token', err);
        res.status(500).json({ success: false, message: 'failed to access', error: err.message });
    }
}

let IsAdmin = (req, res, next) => {
    if (!req.body)
        return res.status(401).json({ message: "Not authenticated" });
    if (req.body.role !== "admin")
        return res.status(403).json({ message: "Admins only" });
    next();
}

module.exports = { verify, IsAdmin };