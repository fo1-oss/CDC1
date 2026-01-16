// API Service Module
const API_BASE_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:3001/api'
    : '/api';

const api = {
    // Authentication
    async requestAccess(data) {
        const response = await fetch(`${API_BASE_URL}/auth/request-access`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return response.json();
    },

    async verifyAccess(token) {
        const response = await fetch(`${API_BASE_URL}/auth/verify`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.json();
    },

    // Metrics
    async getKeyMetrics() {
        const token = sessionStorage.getItem('accessToken');
        const response = await fetch(`${API_BASE_URL}/metrics/key`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.json();
    },

    async getRevenueData() {
        const token = sessionStorage.getItem('accessToken');
        const response = await fetch(`${API_BASE_URL}/metrics/revenue`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.json();
    },

    async getFinancialSummary() {
        const token = sessionStorage.getItem('accessToken');
        const response = await fetch(`${API_BASE_URL}/metrics/financial-summary`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.json();
    },

    async getStoreData() {
        const token = sessionStorage.getItem('accessToken');
        const response = await fetch(`${API_BASE_URL}/metrics/stores`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.json();
    },

    async getUnitEconomics() {
        const token = sessionStorage.getItem('accessToken');
        const response = await fetch(`${API_BASE_URL}/metrics/unit-economics`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.json();
    },

    async getAuditedData() {
        const token = sessionStorage.getItem('accessToken');
        const response = await fetch(`${API_BASE_URL}/metrics/audited`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.json();
    },

    // Documents
    async getDocuments() {
        const token = sessionStorage.getItem('accessToken');
        const response = await fetch(`${API_BASE_URL}/documents`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.json();
    },

    async downloadDocument(docId) {
        const token = sessionStorage.getItem('accessToken');
        window.open(`${API_BASE_URL}/documents/${docId}/download?token=${token}`, '_blank');
    },

    // Team
    async getTeamData() {
        const token = sessionStorage.getItem('accessToken');
        const response = await fetch(`${API_BASE_URL}/team`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.json();
    }
};

// Export for use in other modules
window.api = api;
