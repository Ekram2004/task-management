const express = require('express');
const { createUser, getUser, updateUser, deleteUser, getAllUsers, } = require('../controllers/userControllers');
const router = express.Router();
const { verify, IsAdmin } = require('../middleware/authMiddleware');

router.post("/api/auth", verify, createUser);
router.get("/api/auth/:id", verify, getUser);
router.put("/api/auth/:id", verify, updateUser);
router.delete("/api/auth/:id", verify, deleteUser);
router.get('/api/auth', IsAdmin, getAllUsers);

module.exports = router;


