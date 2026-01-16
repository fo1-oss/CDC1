/**
 * Authentication routes
 */

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Request access to dataroom
router.post('/request-access', authController.requestAccess);

// Verify access token
router.get('/verify', authController.verifyToken);

// Admin: Approve access request
router.post('/approve/:requestId', authController.approveAccess);

module.exports = router;
