// Charts Module - ApexCharts configurations
const ChartConfig = {
    colors: {
        lime: '#C0E529',
        limeDark: '#9BBF1E',
        olive: '#6B8E23',
        oliveDark: '#4A5D23',
        oliveDarker: '#3D4A2B',
        black: '#000000',
        white: '#FFFFFF'
    }
};

const Charts = {
    revenueDonut: null,
    retailDonut: null,
    onlineDonut: null,
    revenueChart: null,
    auditedChart: null,

    init() {
        this.initRevenueDonut();
        this.initMiniDonuts();
        this.initRevenueChart();
        this.initAuditedChart();
    },

    destroy() {
        if (this.revenueDonut) this.revenueDonut.destroy();
        if (this.retailDonut) this.retailDonut.destroy();
        if (this.onlineDonut) this.onlineDonut.destroy();
        if (this.revenueChart) this.revenueChart.destroy();
        if (this.auditedChart) this.auditedChart.destroy();
    },

    initRevenueDonut(data = { online: 51, retail: 49 }) {
        const el = document.querySelector("#revenueDonut");
        if (!el) return;

        this.revenueDonut = new ApexCharts(el, {
            series: [data.online, data.retail],
            chart: { type: 'donut', height: 220 },
            labels: ['Online', 'Retail'],
            colors: [ChartConfig.colors.oliveDark, ChartConfig.colors.lime],
            plotOptions: {
                pie: {
                    donut: {
                        size: '70%',
                        labels: {
                            show: true,
                            name: { show: true, fontSize: '14px', fontWeight: 700 },
                            value: { show: true, fontSize: '20px', fontWeight: 900 },
                            total: { show: true, label: 'Split', fontSize: '12px' }
                        }
                    }
                }
            },
            dataLabels: { enabled: false },
            stroke: { width: 3, colors: [ChartConfig.colors.black] },
            legend: { position: 'bottom', fontWeight: 600 }
        });
        this.revenueDonut.render();
    },

    initMiniDonuts(retailData = { shoes: 92, apparel: 8 }, onlineData = { shoes: 75, apparel: 25 }) {
        // Retail donut
        const retailEl = document.querySelector("#retailDonut");
        if (retailEl) {
            this.retailDonut = new ApexCharts(retailEl, {
                series: [retailData.shoes, retailData.apparel],
                chart: { type: 'donut', height: 120 },
                labels: ['Shoes', 'Apparel'],
                colors: [ChartConfig.colors.oliveDark, ChartConfig.colors.lime],
                plotOptions: { pie: { donut: { size: '65%' } } },
                dataLabels: { enabled: false },
                stroke: { width: 2, colors: [ChartConfig.colors.black] },
                legend: { show: false }
            });
            this.retailDonut.render();
        }

        // Online donut
        const onlineEl = document.querySelector("#onlineDonut");
        if (onlineEl) {
            this.onlineDonut = new ApexCharts(onlineEl, {
                series: [onlineData.shoes, onlineData.apparel],
                chart: { type: 'donut', height: 120 },
                labels: ['Shoes', 'Apparel'],
                colors: [ChartConfig.colors.oliveDark, ChartConfig.colors.lime],
                plotOptions: { pie: { donut: { size: '65%' } } },
                dataLabels: { enabled: false },
                stroke: { width: 2, colors: [ChartConfig.colors.black] },
                legend: { show: false }
            });
            this.onlineDonut.render();
        }
    },

    initRevenueChart(data = null) {
        const el = document.querySelector("#revenueChart");
        if (!el) return;

        const defaultData = {
            values: [17.1, 17.4, 23.6, 21.7, 27.1, 28.4, 37.8],
            margins: ['22%', '22%', '21%', '21%', '23%', '22%', '18%'],
            categories: ["Q1'25", "Q2'25", "Q3'25", "Q4'25", "Q1'26", "Q2'26", "Q3'26"]
        };

        const chartData = data || defaultData;

        this.revenueChart = new ApexCharts(el, {
            series: [{
                name: 'Revenue',
                data: chartData.values
            }],
            chart: { type: 'bar', height: 350, toolbar: { show: false } },
            plotOptions: { bar: { borderRadius: 8, columnWidth: '55%' } },
            colors: [ChartConfig.colors.lime],
            stroke: { width: 3, colors: [ChartConfig.colors.black] },
            dataLabels: {
                enabled: true,
                formatter: (val) => '₹' + val + 'Cr',
                offsetY: -20,
                style: { fontSize: '11px', fontWeight: 900, colors: [ChartConfig.colors.black] }
            },
            xaxis: {
                categories: chartData.categories,
                labels: { style: { fontWeight: 600 } }
            },
            yaxis: { labels: { formatter: (val) => '₹' + val + 'Cr' } },
            annotations: {
                points: chartData.categories.map((cat, i) => ({
                    x: cat,
                    y: chartData.values[i],
                    marker: { size: 0 },
                    label: {
                        text: chartData.margins[i],
                        borderWidth: 2,
                        borderColor: ChartConfig.colors.black,
                        style: {
                            background: ChartConfig.colors.black,
                            color: '#fff',
                            fontWeight: 700,
                            padding: { left: 8, right: 8, top: 4, bottom: 4 }
                        }
                    }
                }))
            },
            grid: { borderColor: '#e0e0e0' }
        });
        this.revenueChart.render();
    },

    initAuditedChart(data = null) {
        const el = document.querySelector("#auditedChart");
        if (!el) return;

        const defaultData = {
            values: [35.2, 65.3, 75.6],
            categories: ["FY'23", "FY'24", "FY'25"]
        };

        const chartData = data || defaultData;

        this.auditedChart = new ApexCharts(el, {
            series: [{ name: 'Revenue', data: chartData.values }],
            chart: { type: 'bar', height: 350, toolbar: { show: false } },
            plotOptions: { bar: { borderRadius: 12, columnWidth: '50%', distributed: true } },
            colors: [ChartConfig.colors.olive, ChartConfig.colors.oliveDark, ChartConfig.colors.lime],
            stroke: { width: 3, colors: [ChartConfig.colors.black] },
            dataLabels: {
                enabled: true,
                formatter: (val) => '₹' + val + ' Cr',
                offsetY: -20,
                style: { fontSize: '16px', fontWeight: 900, colors: [ChartConfig.colors.black] }
            },
            xaxis: {
                categories: chartData.categories,
                labels: { style: { fontSize: '14px', fontWeight: 700 } }
            },
            yaxis: { labels: { formatter: (val) => '₹' + val + 'Cr' } },
            legend: { show: false },
            grid: { borderColor: '#e0e0e0' }
        });
        this.auditedChart.render();
    },

    // Update methods for dynamic data
    updateRevenueDonut(online, retail) {
        if (this.revenueDonut) {
            this.revenueDonut.updateSeries([online, retail]);
        }
    },

    updateRevenueChart(data) {
        if (this.revenueChart) {
            this.revenueChart.updateSeries([{ data: data.values }]);
        }
    },

    updateAuditedChart(data) {
        if (this.auditedChart) {
            this.auditedChart.updateSeries([{ data: data.values }]);
        }
    }
};

// Export for use in other modules
window.Charts = Charts;
