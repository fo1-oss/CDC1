import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'

export function Login() {
    const { signInWithEmail } = useAuth()
    const [role, setRole] = useState<'investor' | 'admin'>('investor')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        // In a real app we would ask for email too. 
        // Here we map password to a dummy email for the context signature
        const email = role === 'investor' ? 'investor@example.com' : 'admin@example.com'

        const { error } = await signInWithEmail(email, password)

        if (error) {
            setError('Invalid credentials. Please try again.')
        }
        setLoading(false)
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Overlay */}
            <div className="absolute inset-0 z-0">
                {/* We can put the 3D background here later */}
                <div className="absolute inset-0 bg-cream opacity-90"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="glass-card p-10">
                    <div className="text-center mb-10">
                        <div className="flex justify-center mb-6">
                            <div className="font-display leading-none">
                                <div className="text-4xl text-black">CREPDOG</div>
                                <div className="text-5xl text-black font-black">CREW</div>
                            </div>
                        </div>
                        <p className="text-gray-500 font-medium">Investor Dataroom Access</p>
                    </div>

                    <div className="flex bg-gray-100 p-1 rounded-xl mb-8">
                        <button
                            onClick={() => setRole('investor')}
                            className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${role === 'investor' ? 'bg-lime shadow-sm' : 'text-gray-500 hover:bg-gray-200'}`}
                        >
                            Investor
                        </button>
                        <button
                            onClick={() => setRole('admin')}
                            className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${role === 'admin' ? 'bg-lime shadow-sm' : 'text-gray-500 hover:bg-gray-200'}`}
                        >
                            Admin
                        </button>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold mb-2 ml-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={role === 'investor' ? 'Enter: investor2026' : 'Enter: admin2026'}
                                className="input-field"
                            />
                        </div>

                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="text-red-500 text-sm font-medium text-center bg-red-50 p-3 rounded-lg"
                                >
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full flex justify-center items-center"
                        >
                            {loading ? 'Verifying...' : 'Access Dataroom'}
                        </button>
                    </form>

                    <p className="text-center text-gray-400 text-xs mt-8">
                        Restricted access. All activities are logged.
                    </p>
                </div>
            </motion.div>
        </div>
    )
}
