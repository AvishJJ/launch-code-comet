
import { useEffect, useState, createContext, useContext, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  signInWithProvider: (provider: 'github' | 'google') => Promise<void>;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Helper function to safely redirect to dashboard
  const redirectToDashboard = () => {
    console.log("Redirecting to dashboard");
    if (window.location.pathname !== '/dashboard') {
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 100);
    }
  };

  useEffect(() => {
    // Check URL for hash fragment from OAuth redirects
    const handleOAuthRedirect = async () => {
      const hasOAuthCode = window.location.hash && 
                           (window.location.hash.includes('access_token') || 
                            window.location.hash.includes('error'));
      
      if (hasOAuthCode) {
        console.log("Detected OAuth redirect");
        const { data, error } = await supabase.auth.getSession();
        
        if (data?.session && !error) {
          console.log("Valid session found after OAuth redirect");
          setSession(data.session);
          setUser(data.session.user);
          redirectToDashboard();
        }
      }
    };
    
    handleOAuthRedirect();

    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);

        if (event === 'SIGNED_IN') {
          redirectToDashboard();
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Initial session check:", session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user && window.location.pathname !== '/dashboard') {
        redirectToDashboard();
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      return { error };
    } catch (error) {
      console.error("Sign in error:", error);
      return { error: error as Error };
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const { error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      });
      
      return { error };
    } catch (error) {
      console.error("Sign up error:", error);
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    try {
      console.log("Signing out user");
      await supabase.auth.signOut();
      navigate('/auth');
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const signInWithProvider = async (provider: 'github' | 'google') => {
    try {
      const redirectTo = window.location.origin + '/dashboard';
      console.log(`OAuth attempt with ${provider}, redirect URL: ${redirectTo}`);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: redirectTo,
          skipBrowserRedirect: false
        }
      });
      
      if (error) {
        console.error(`${provider} OAuth error:`, error);
        throw error;
      }
      
      console.log(`${provider} OAuth flow initiated successfully`, data);
    } catch (error: any) {
      console.error(`${provider} OAuth provider error:`, error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signIn, signUp, signOut, signInWithProvider }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
