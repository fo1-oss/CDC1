/**
 * Documents controller
 */

const path = require('path');
const fs = require('fs');

// Document registry
const documents = [
    {
        id: 'pitch-deck',
        title: 'Pitch Deck',
        subtitle: 'January 2026',
        filename: 'CrepDog Crew Pitch Deck - January\'26.pdf',
        type: 'pdf',
        category: 'presentation',
        headerColor: 'lime',
        icon: 'fa-chart-line'
    },
    {
        id: 'mis-metrics',
        title: 'MIS & Metrics',
        subtitle: 'YTD FY\'26',
        filename: 'Crepdog Crew_MIS_Operational Metrics_YTD FY26.xlsx',
        type: 'xlsx',
        category: 'financial',
        headerColor: 'olive',
        icon: 'fa-table'
    },
    {
        id: 'audited-fy25',
        title: 'Audited FY\'25',
        subtitle: 'Financial Statements',
        filename: 'Financial Statement_31.03.2025.pdf',
        type: 'pdf',
        category: 'audited',
        headerColor: 'black',
        icon: 'fa-file-invoice-dollar'
    },
    {
        id: 'audited-fy24',
        title: 'Audited FY\'24',
        subtitle: 'Financial Statements',
        filename: 'Financials_FY24_House of CDC Fashion Private Limited.pdf',
        type: 'pdf',
        category: 'audited',
        headerColor: 'lime',
        icon: 'fa-file-invoice-dollar'
    },
    {
        id: 'audited-fy23',
        title: 'Audited FY\'23',
        subtitle: 'Financial Statements',
        filename: 'Financial statement_31.03.2023.pdf',
        type: 'pdf',
        category: 'audited',
        headerColor: 'olive',
        icon: 'fa-file-invoice-dollar'
    },
    {
        id: 'cap-table',
        title: 'Cap Table',
        subtitle: 'March 2025',
        filename: 'CDC cap table - 31032025.xlsx',
        type: 'xlsx',
        category: 'corporate',
        headerColor: 'black',
        icon: 'fa-users'
    }
];

const documentsController = {
    /**
     * Get list of available documents
     */
    getDocuments: async (req, res) => {
        try {
            const { category } = req.query;

            let filteredDocs = documents;

            if (category) {
                filteredDocs = documents.filter(doc => doc.category === category);
            }

            res.json({
                documents: filteredDocs.map(doc => ({
                    id: doc.id,
                    title: doc.title,
                    subtitle: doc.subtitle,
                    type: doc.type,
                    category: doc.category,
                    headerColor: doc.headerColor,
                    icon: doc.icon,
                    downloadUrl: `/api/documents/${doc.id}/download`
                })),
                total: filteredDocs.length
            });
        } catch (error) {
            console.error('Get documents error:', error);
            res.status(500).json({
                error: true,
                message: 'Failed to fetch documents'
            });
        }
    },

    /**
     * Get document metadata
     */
    getDocumentInfo: async (req, res) => {
        try {
            const { docId } = req.params;

            const doc = documents.find(d => d.id === docId);

            if (!doc) {
                return res.status(404).json({
                    error: true,
                    message: 'Document not found'
                });
            }

            res.json({
                id: doc.id,
                title: doc.title,
                subtitle: doc.subtitle,
                type: doc.type,
                category: doc.category,
                headerColor: doc.headerColor,
                icon: doc.icon,
                downloadUrl: `/api/documents/${doc.id}/download`
            });
        } catch (error) {
            console.error('Get document info error:', error);
            res.status(500).json({
                error: true,
                message: 'Failed to fetch document info'
            });
        }
    },

    /**
     * Download a specific document
     */
    downloadDocument: async (req, res) => {
        try {
            const { docId } = req.params;
            const { token } = req.query;

            // Verify token (simplified - use proper auth in production)
            if (!token) {
                return res.status(401).json({
                    error: true,
                    message: 'Access token required'
                });
            }

            const doc = documents.find(d => d.id === docId);

            if (!doc) {
                return res.status(404).json({
                    error: true,
                    message: 'Document not found'
                });
            }

            const filePath = path.join(__dirname, '..', 'documents', doc.filename);

            // Check if file exists
            if (!fs.existsSync(filePath)) {
                // In production, return actual file
                // For demo, return placeholder response
                return res.json({
                    message: 'Document download initiated',
                    document: {
                        id: doc.id,
                        title: doc.title,
                        filename: doc.filename
                    },
                    note: 'In production, this would download the actual file'
                });
            }

            // Send file
            res.download(filePath, doc.filename);

        } catch (error) {
            console.error('Download document error:', error);
            res.status(500).json({
                error: true,
                message: 'Failed to download document'
            });
        }
    }
};

module.exports = documentsController;
