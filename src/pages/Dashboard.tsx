import { motion } from 'framer-motion'
import { RevenueChart, ChannelChart } from '../components/Charts'
import { ThreeViewer } from '../components/ThreeViewer'
import { FileText, TrendingUp, Users, DollarSign, Download } from 'lucide-react'

// Mock Data (In real app, fetch from Supabase in useEffect)
const METRICS = [
    { title: 'YTD Revenue', value: '₹93.3 Cr', sub: '+17% YoY', icon: DollarSign, color: 'text-lime-dark' },
    { title: 'Gross Margin', value: '21.1%', sub: '+40 bps', icon: TrendingUp, color: 'text-olive' },
    { title: 'Customers', value: '58.3K', sub: 'FY26 YTD', icon: Users, color: 'text-blue-600' },
    { title: 'Avg Order Value', value: '₹12,549', sub: 'Premium', icon: FileText, color: 'text-purple-600' },
]

const DOCUMENTS = [
    { name: 'Investor Pitch Deck', type: 'PDF', date: 'Jan 2026' },
    { name: 'Audited Financials FY25', type: 'PDF', date: 'Dec 2025' },
    { name: 'Cap Table Struct', type: 'XLSX', date: 'Current' },
]

const CHART_DATA = [
    { month: "Apr", gmv: 8.0 },
    { month: "May", gmv: 9.4 },
    { month: "Jun", gmv: 9.7 },
    { month: "Jul", gmv: 9.7 },
    { month: "Aug", gmv: 10.3 },
    { month: "Sep", gmv: 8.3 },
    { month: "Oct", gmv: 9.1 },
    { month: "Nov", gmv: 13.1 },
    { month: "Dec", gmv: 15.6 },
]

const CHANNEL_DATA = [
    { name: 'Retail', value: 52 },
    { name: 'Online', value: 48 },
]

export function Dashboard() {
    // Images fallback if not present
    const shoeImage = '/images/shoe.png' // Vite public dir
    const hoodieImage = '/images/hoodie.png'

    return (
        <div className="space-y-10 animate-fade-in">
            {/* Header Section */}
            <section id="overview" className="text-center space-y-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-block"
                >
                    <span className="px-4 py-1.5 rounded-full bg-lime text-black font-bold text-sm">
                        Series A Ready
                    </span>
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl md:text-7xl font-display uppercase"
                >
                    Scaling <span className="text-lime-dark">Premium</span><br />Type Culture
                </motion.h1>
            </section>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {METRICS.map((Metric, i) => (
                    <motion.div
                        key={Metric.title}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 + (i * 0.1) }}
                        className="glass-card p-6 border-l-4 border-l-lime"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">{Metric.title}</p>
                                <h3 className="text-2xl md:text-3xl font-black mt-1">{Metric.value}</h3>
                            </div>
                            <Metric.icon className={`h-6 w-6 ${Metric.color}`} />
                        </div>
                        <div className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 w-fit px-2 py-1 rounded">
                            <TrendingUp size={12} />
                            {Metric.sub}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* 3D Showcase */}
            <section className="grid md:grid-cols-2 gap-8">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="glass-card p-6"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-display text-2xl">Visual Merchandising</h3>
                        <button className="text-xs font-bold border-b-2 border-black">VIEW CATALOG</button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <ThreeViewer imageUrl={shoeImage} alt="ON Cloudtilt" />
                            <p className="text-center font-bold text-sm">ON Cloudtilt</p>
                        </div>
                        <div className="space-y-2">
                            <ThreeViewer imageUrl={hoodieImage} alt="KRYP Hoodie" />
                            <p className="text-center font-bold text-sm">KRYP Hoodie</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="glass-card p-6 flex flex-col"
                >
                    <h3 className="font-display text-2xl mb-6">Revenue Trajectory</h3>
                    <div className="flex-1 min-h-[300px]">
                        <RevenueChart data={CHART_DATA} />
                    </div>
                </motion.div>
            </section>

            {/* Channel & Docs */}
            <section className="grid md:grid-cols-3 gap-8">
                <div className="glass-card p-6 col-span-1">
                    <h3 className="font-display text-xl mb-4">Channel Split</h3>
                    <ChannelChart data={CHANNEL_DATA} />
                    <div className="flex justify-center gap-6 mt-4 text-sm font-medium">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-[#6B7A3D]"></div> Retail (52%)
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-[#BFFF00]"></div> Online (48%)
                        </div>
                    </div>
                </div>

                <div id="documents" className="glass-card p-6 col-span-2">
                    <h3 className="font-display text-xl mb-6">Due Diligence Docs</h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {DOCUMENTS.map((doc, i) => (
                            <div key={i} className="border-2 border-gray-100 rounded-xl p-4 hover:border-lime transition-colors cursor-pointer group">
                                <div className="flex justify-between items-start mb-3">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${doc.type === 'PDF' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                                        <FileText size={20} />
                                    </div>
                                    <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded">{doc.type}</span>
                                </div>
                                <p className="font-bold text-sm truncate">{doc.name}</p>
                                <div className="flex justify-between items-center mt-3">
                                    <p className="text-xs text-gray-500">{doc.date}</p>
                                    <div className="p-1.5 rounded-full bg-gray-50 group-hover:bg-lime transition-colors">
                                        <Download size={14} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
