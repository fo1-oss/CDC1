/**
 * Documents routes
 */

const express = require('express');
const router = express.Router();
const documentsController = require('../controllers/documentsController');
const { authenticateToken } = require('../middleware/auth');

// Get list of available documents
router.get('/', authenticateToken, documentsController.getDocuments);

// Download a specific document
router.get('/:docId/download', documentsController.downloadDocument);

// Get document metadata
router.get('/:docId', authenticateToken, documentsController.getDocumentInfo);

module.exports = router;
