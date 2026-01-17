import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { LogOut, User as UserIcon, Settings } from 'lucide-react'

export function Layout({ children }: { children: React.ReactNode }) {
    const { isAdmin, signOut } = useAuth()

    return (
        <div className="min-h-screen relative font-sans">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4">
                <div className="glass-card max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="font-display leading-none">
                            <div className="text-[14px] text-black">CREPDOG</div>
                            <div className="text-[18px] text-black font-black">CREW</div>
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full font-bold bg-lime text-black">DATAROOM</span>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-2">
                        {['Overview', 'Financials', 'Channels', 'Documents', 'Team'].map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} className="px-4 py-2 rounded-full text-sm font-medium hover:bg-lime/20 transition-colors">
                                {item}
                            </a>
                        ))}
                    </div>

                    {/* User Controls */}
                    <div className="flex items-center gap-4">
                        <span className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ${isAdmin ? 'bg-red-500 text-white' : 'bg-lime text-black'}`}>
                            {isAdmin ? <Settings size={14} /> : <UserIcon size={14} />}
                            {isAdmin ? 'Admin' : 'Investor'}
                        </span>

                        <button onClick={() => signOut()} className="text-sm text-gray-500 hover:text-black flex items-center gap-1 transition-colors">
                            <LogOut size={16} />
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="pt-32 pb-20 px-4 md:px-6">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>

            {/* Footer */}
            <footer className="py-8 text-center text-sm text-gray-500">
                <p>© 2026 House of CDC Pvt Ltd. All rights reserved.</p>
                <p className="mt-2 text-xs">Confidential information for prospective investors.</p>
            </footer>
        </div>
    )
}
