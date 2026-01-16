/**
 * Team routes
 */

const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');
const { authenticateToken } = require('../middleware/auth');

// Get team information
router.get('/', authenticateToken, teamController.getTeamData);

// Get specific team member
router.get('/:memberId', authenticateToken, teamController.getTeamMember);

module.exports = router;
