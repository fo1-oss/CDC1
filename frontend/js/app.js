// Main Application Module
const App = {
    currentSection: 'overview',
    isAuthenticated: false,

    init() {
        this.checkAuth();
        this.setupEventListeners();
    },

    checkAuth() {
        const hasAccess = sessionStorage.getItem('hasAccess');
        if (hasAccess === 'true') {
            this.showMainApp();
        }
    },

    setupEventListeners() {
        // Access form submission
        const accessForm = document.getElementById('accessForm');
        if (accessForm) {
            accessForm.addEventListener('submit', (e) => this.handleAccessRequest(e));
        }

        // Navigation
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => this.handleNavigation(e, item));
        });
    },

    async handleAccessRequest(e) {
        e.preventDefault();

        const form = e.target;
        const formData = {
            name: form.querySelector('input[type="text"]').value,
            email: form.querySelector('input[type="email"]').value,
            organization: form.querySelectorAll('input[type="text"]')[1].value,
            message: form.querySelector('textarea').value
        };

        try {
            // In production, this would call the backend API
            // const response = await api.requestAccess(formData);

            // For now, simulate success
            sessionStorage.setItem('hasAccess', 'true');
            this.showMainApp();
        } catch (error) {
            console.error('Access request failed:', error);
            alert('Failed to submit access request. Please try again.');
        }
    },

    showMainApp() {
        const accessOverlay = document.getElementById('accessOverlay');
        const mainApp = document.getElementById('mainApp');

        if (accessOverlay) accessOverlay.classList.add('hidden');
        if (mainApp) mainApp.style.display = 'flex';

        this.isAuthenticated = true;
        this.initializeData();
    },

    async initializeData() {
        // Initialize charts
        if (window.Charts) {
            Charts.init();
        }

        // Load data from API if available
        try {
            // const metrics = await api.getKeyMetrics();
            // this.updateMetrics(metrics);
        } catch (error) {
            console.log('Using static data');
        }
    },

    handleNavigation(e, item) {
        e.preventDefault();
        const sectionId = item.dataset.section;

        if (sectionId === this.currentSection) return;

        // Update nav items
        document.querySelectorAll('.nav-item').forEach(nav => {
            nav.classList.remove('active');
        });
        item.classList.add('active');

        // Update sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
            if (section.id === sectionId) {
                section.classList.add('active');
            }
        });

        this.currentSection = sectionId;
    },

    // Utility methods
    formatCurrency(value, decimals = 1) {
        if (value >= 10000000) {
            return '₹' + (value / 10000000).toFixed(decimals) + ' Cr';
        } else if (value >= 100000) {
            return '₹' + (value / 100000).toFixed(decimals) + ' L';
        }
        return '₹' + value.toLocaleString('en-IN');
    },

    formatPercent(value) {
        return value.toFixed(1) + '%';
    },

    // Data update methods
    updateMetrics(data) {
        // Update metric rows with API data
        const metricElements = document.querySelectorAll('.metric-row-value');
        if (data.metrics && metricElements.length > 0) {
            data.metrics.forEach((metric, index) => {
                if (metricElements[index]) {
                    metricElements[index].textContent = metric.value;
                }
            });
        }
    },

    updateStoreCards(stores) {
        stores.forEach((store, index) => {
            const card = document.querySelectorAll('.store-card')[index];
            if (card) {
                card.querySelector('.store-revenue').textContent = store.revenue;
                card.querySelector('.store-bar-fill').style.width = store.barWidth + '%';
                const mixItems = card.querySelectorAll('.store-mix-value');
                if (mixItems[0]) mixItems[0].textContent = store.shoes + '%';
                if (mixItems[1]) mixItems[1].textContent = store.apparel + '%';
            }
        });
    },

    // Document download
    downloadDocument(docId, filename) {
        if (window.api) {
            api.downloadDocument(docId);
        } else {
            // Fallback to direct link
            window.open(`/documents/${filename}`, '_blank');
        }
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

// Export for use in other modules
window.App = App;
