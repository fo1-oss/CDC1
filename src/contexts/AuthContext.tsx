import React, { createContext, useContext, useEffect, useState } from 'react'
import { type Session, type User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

interface AuthContextType {
    session: Session | null
    user: User | null
    loading: boolean
    isAdmin: boolean
    signInWithEmail: (email: string, password: string) => Promise<{ error: any }>
    signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [session, setSession] = useState<Session | null>(null)
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        // Check for active session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            setUser(session?.user ?? null)
            checkAdmin(session?.user)
            setLoading(false)
        })

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            setUser(session?.user ?? null)
            checkAdmin(session?.user)
            setLoading(false)
        })

        return () => subscription.unsubscribe()
    }, [])

    const checkAdmin = (user: User | null | undefined) => {
        if (!user) {
            setIsAdmin(false)
            return
        }
        // Simple admin check based on email or metadata
        // In production, use Row Level Security or a proper roles table
        if (user.email?.includes('admin') || user.user_metadata?.role === 'admin') {
            setIsAdmin(true)
        } else {
            setIsAdmin(false)
        }
    }

    const signInWithEmail = async (email: string, password: string) => {
        // DEMO MODE: If no supabase credentials, allow mock login
        if (!import.meta.env.VITE_SUPABASE_URL) {
            console.log('Demo mode login')
            if (password === 'investor2026') {
                const mockUser = { id: 'inv-1', email: 'investor@example.com', aud: 'authenticated' } as User
                const mockSession = { user: mockUser, access_token: 'mock', expires_in: 3600 } as unknown as Session
                setSession(mockSession)
                setUser(mockUser)
                setIsAdmin(false)
                return { error: null }
            }
            if (password === 'admin2026') {
                const mockUser = { id: 'adm-1', email: 'admin@example.com', aud: 'authenticated' } as User
                const mockSession = { user: mockUser, access_token: 'mock', expires_in: 3600 } as unknown as Session
                setSession(mockSession)
                setUser(mockUser)
                setIsAdmin(true)
                return { error: null }
            }
            return { error: { message: 'Invalid demo password' } }
        }

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        return { error }
    }

    const signOut = async () => {
        if (!import.meta.env.VITE_SUPABASE_URL) {
            setSession(null)
            setUser(null)
            setIsAdmin(false)
            return
        }
        await supabase.auth.signOut()
    }

    return (
        <AuthContext.Provider value={{ session, user, loading, isAdmin, signInWithEmail, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
