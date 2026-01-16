/**
 * Metrics routes
 */

const express = require('express');
const router = express.Router();
const metricsController = require('../controllers/metricsController');
const { authenticateToken } = require('../middleware/auth');

// Get key metrics
router.get('/key', authenticateToken, metricsController.getKeyMetrics);

// Get revenue data
router.get('/revenue', authenticateToken, metricsController.getRevenueData);

// Get financial summary
router.get('/financial-summary', authenticateToken, metricsController.getFinancialSummary);

// Get store data
router.get('/stores', authenticateToken, metricsController.getStoreData);

// Get unit economics
router.get('/unit-economics', authenticateToken, metricsController.getUnitEconomics);

// Get audited financials data
router.get('/audited', authenticateToken, metricsController.getAuditedData);

module.exports = router;
