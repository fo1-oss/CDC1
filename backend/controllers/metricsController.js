/**
 * Metrics controller
 */

const metricsController = {
    /**
     * Get key business metrics
     */
    getKeyMetrics: async (req, res) => {
        try {
            const metrics = {
                company: {
                    founded: 2019,
                    headquarters: 'Delhi',
                    teamSize: '100+'
                },
                financial: {
                    arr: '₹186 Crore',
                    arrValue: 18600000000,
                    grossMargin: 21,
                    cm2: 10
                },
                operational: {
                    stores: 3,
                    storeLocations: ['Delhi', 'Mumbai', 'Hyderabad'],
                    monthlyBillings: 8200,
                    revenuePerSqft: 5000,
                    avgBillingValue: 12500,
                    customers: 250000,
                    retentionRate: 30
                },
                period: 'YTD FY\'26',
                updatedAt: new Date().toISOString()
            };

            res.json(metrics);
        } catch (error) {
            console.error('Get metrics error:', error);
            res.status(500).json({
                error: true,
                message: 'Failed to fetch metrics'
            });
        }
    },

    /**
     * Get revenue data for charts
     */
    getRevenueData: async (req, res) => {
        try {
            const revenueData = {
                quarterly: {
                    values: [17.1, 17.4, 23.6, 21.7, 27.1, 28.4, 37.8],
                    margins: [22, 22, 21, 21, 23, 22, 18],
                    categories: ["Q1'25", "Q2'25", "Q3'25", "Q4'25", "Q1'26", "Q2'26", "Q3'26"]
                },
                distribution: {
                    online: 51,
                    retail: 49
                },
                productMix: {
                    retail: { shoes: 92, apparel: 8 },
                    online: { shoes: 75, apparel: 25 }
                },
                period: 'YTD FY\'26',
                updatedAt: new Date().toISOString()
            };

            res.json(revenueData);
        } catch (error) {
            console.error('Get revenue data error:', error);
            res.status(500).json({
                error: true,
                message: 'Failed to fetch revenue data'
            });
        }
    },

    /**
     * Get financial summary (P&L)
     */
    getFinancialSummary: async (req, res) => {
        try {
            const financialSummary = {
                periods: ['FY\'24', 'FY\'25', 'YTD FY\'26'],
                data: {
                    gmv: {
                        label: 'GMV',
                        values: [69.0, 79.7, 93.3],
                        unit: 'Cr'
                    },
                    shoes: {
                        label: 'Shoes',
                        values: [52.5, 62.1, 78.4],
                        unit: 'Cr',
                        isSubItem: true
                    },
                    apparels: {
                        label: 'Apparels',
                        values: [16.5, 17.6, 14.8],
                        unit: 'Cr',
                        isSubItem: true
                    },
                    operatingRevenue: {
                        label: 'Operating Revenue',
                        values: [65.3, 75.6, 88.5],
                        unit: 'Cr'
                    },
                    cogs: {
                        label: 'COGS',
                        values: [51.7, 59.5, 69.9],
                        unit: 'Cr'
                    },
                    grossProfit: {
                        label: 'Gross Profit',
                        values: [13.7, 16.1, 18.6],
                        unit: 'Cr',
                        highlight: true
                    },
                    grossMargin: {
                        label: 'Gross Margin %',
                        values: [20.9, 21.3, 21.1],
                        unit: '%',
                        highlight: true
                    }
                },
                updatedAt: new Date().toISOString()
            };

            res.json(financialSummary);
        } catch (error) {
            console.error('Get financial summary error:', error);
            res.status(500).json({
                error: true,
                message: 'Failed to fetch financial summary'
            });
        }
    },

    /**
     * Get store performance data
     */
    getStoreData: async (req, res) => {
        try {
            const storeData = {
                stores: [
                    {
                        id: 'delhi',
                        name: 'Delhi',
                        since: "Apr'19",
                        revenue: 37.2,
                        revenueUnit: 'Cr',
                        period: 'YTD FY\'26',
                        mix: { shoes: 78, apparel: 22 },
                        barWidth: 100
                    },
                    {
                        id: 'mumbai',
                        name: 'Mumbai',
                        since: "Jul'24",
                        revenue: 24.9,
                        revenueUnit: 'Cr',
                        period: 'YTD FY\'26',
                        mix: { shoes: 74, apparel: 26 },
                        barWidth: 67
                    },
                    {
                        id: 'hyderabad',
                        name: 'Hyderabad',
                        since: "Oct'24",
                        revenue: 11.3,
                        revenueUnit: 'Cr',
                        period: 'YTD FY\'26',
                        mix: { shoes: 74, apparel: 26 },
                        barWidth: 30
                    }
                ],
                summary: {
                    totalRevenue: 73.4,
                    avgMix: { shoes: 75, apparel: 25 }
                },
                updatedAt: new Date().toISOString()
            };

            res.json(storeData);
        } catch (error) {
            console.error('Get store data error:', error);
            res.status(500).json({
                error: true,
                message: 'Failed to fetch store data'
            });
        }
    },

    /**
     * Get unit economics
     */
    getUnitEconomics: async (req, res) => {
        try {
            const unitEconomics = {
                online: {
                    netSales: 100,
                    cogsGst: 82,
                    grossMargin: 18,
                    cm1: 14,
                    opEbitda: 3
                },
                retail: {
                    netSales: 100,
                    cogsGst: 80,
                    grossMargin: 20,
                    cm1: 19,
                    opEbitda: 9
                },
                kpis: {
                    roas: 24,
                    orderFulfillment: 98,
                    marketingSpend: 7,
                    abvOnline: 12600,
                    abvRetail: 15500,
                    monthlyFootfall: 9000,
                    conversionRate: 35,
                    rentToRevenue: 3
                },
                period: 'YTD FY\'26',
                updatedAt: new Date().toISOString()
            };

            res.json(unitEconomics);
        } catch (error) {
            console.error('Get unit economics error:', error);
            res.status(500).json({
                error: true,
                message: 'Failed to fetch unit economics'
            });
        }
    },

    /**
     * Get audited financials data
     */
    getAuditedData: async (req, res) => {
        try {
            const auditedData = {
                revenue: {
                    values: [35.2, 65.3, 75.6],
                    categories: ["FY'23", "FY'24", "FY'25"]
                },
                highlights: [
                    'Consistent GM improvement 20.5% → 21.3%',
                    'Strong omnichannel growth with retail expansion',
                    'Path to profitability with improving EBITDA',
                    'Revenue more than doubled in 2 years'
                ],
                auditor: {
                    opinion: 'Unqualified / Clean',
                    latestPeriod: 'FY 2024-25'
                },
                updatedAt: new Date().toISOString()
            };

            res.json(auditedData);
        } catch (error) {
            console.error('Get audited data error:', error);
            res.status(500).json({
                error: true,
                message: 'Failed to fetch audited data'
            });
        }
    }
};

module.exports = metricsController;
