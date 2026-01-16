/**
 * Authentication controller
 */

const jwt = require('jsonwebtoken');
const config = require('../config');

// In-memory storage for demo (use database in production)
const accessRequests = [];

const authController = {
    /**
     * Handle access request
     */
    requestAccess: async (req, res) => {
        try {
            const { name, email, organization, message } = req.body;

            // Validate required fields
            if (!name || !email || !organization) {
                return res.status(400).json({
                    error: true,
                    message: 'Name, email, and organization are required'
                });
            }

            // Create access request
            const request = {
                id: Date.now().toString(),
                name,
                email,
                organization,
                message: message || '',
                status: 'pending',
                createdAt: new Date().toISOString()
            };

            accessRequests.push(request);

            // For demo purposes, auto-approve and return token
            // In production, this would require admin approval
            const token = jwt.sign(
                {
                    requestId: request.id,
                    email: request.email,
                    organization: request.organization
                },
                config.jwt.secret,
                { expiresIn: config.jwt.expiresIn }
            );

            res.status(201).json({
                success: true,
                message: 'Access granted',
                token,
                expiresIn: config.jwt.expiresIn
            });

        } catch (error) {
            console.error('Request access error:', error);
            res.status(500).json({
                error: true,
                message: 'Failed to process access request'
            });
        }
    },

    /**
     * Verify access token
     */
    verifyToken: async (req, res) => {
        try {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];

            if (!token) {
                return res.status(401).json({
                    error: true,
                    valid: false,
                    message: 'No token provided'
                });
            }

            const decoded = jwt.verify(token, config.jwt.secret);

            res.json({
                valid: true,
                user: {
                    email: decoded.email,
                    organization: decoded.organization
                },
                expiresAt: new Date(decoded.exp * 1000).toISOString()
            });

        } catch (error) {
            res.status(401).json({
                error: true,
                valid: false,
                message: 'Invalid or expired token'
            });
        }
    },

    /**
     * Admin: Approve access request
     */
    approveAccess: async (req, res) => {
        try {
            const { requestId } = req.params;

            const request = accessRequests.find(r => r.id === requestId);

            if (!request) {
                return res.status(404).json({
                    error: true,
                    message: 'Access request not found'
                });
            }

            request.status = 'approved';
            request.approvedAt = new Date().toISOString();

            // Generate token for approved user
            const token = jwt.sign(
                {
                    requestId: request.id,
                    email: request.email,
                    organization: request.organization
                },
                config.jwt.secret,
                { expiresIn: config.jwt.expiresIn }
            );

            res.json({
                success: true,
                message: 'Access approved',
                token
            });

        } catch (error) {
            console.error('Approve access error:', error);
            res.status(500).json({
                error: true,
                message: 'Failed to approve access'
            });
        }
    }
};

module.exports = authController;
