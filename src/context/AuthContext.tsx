import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabase-client';

interface AuthContextType {
  user: User || null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children } : { children: React.ReactNode}) => { 

    const [user, setUser] = useState<User | null>(null);

    const signIn = async () => {
        supabase.auth.signInWithOAuth({provider: 'github'});
    };


    const signOut = async () => {
        // Implement sign-out logic here
    };

    return (
    <AuthContext.Provider value={{user, signIn, signOut}}> 
        {""} 
        {children}{""} 
    </AuthContext.Provider>
);
};

export const useAuth = () => {
  const context = useContext(AuthContext);
    if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};