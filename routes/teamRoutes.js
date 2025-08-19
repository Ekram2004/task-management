const express = require('express')
const { IsAdmin } = require('../middleware/authMiddleware');
const { createTeam, getTeam, updateTeam, deleteTeam, getAllTeam, addMemeber, removeMemeber } = require('../controllers/teamController');
const router = express.Router();

router.post("/api/team", IsAdmin, createTeam);
router.get("/api/team/:id", IsAdmin, getTeam);
router.put("/api/team/:id", IsAdmin, updateTeam);
router.delete("/api/team/:id", IsAdmin, deleteTeam);
router.get("/api/team/", IsAdmin, getAllTeam);
router.post("/api/team/", IsAdmin, addMemeber);
router.delete("/api/team/", IsAdmin, removeMemeber);

module.exports = router;