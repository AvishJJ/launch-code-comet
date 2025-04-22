
import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { OAuthButtons } from './OAuthButtons';
import { AuthForm } from './AuthForm';
import { AuthToggle } from './AuthToggle';
import { Rocket } from 'lucide-react';

export default function AuthCard() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp, signInWithProvider } = useAuth();
  const navigate = useNavigate();

  const handleAuth = async ({ email, password, fullName, confirmPassword }: { 
    email: string; 
    password: string; 
    fullName?: string; 
    confirmPassword?: string 
  }) => {
    setIsLoading(true);

    try {
      if (isSignUp) {
        if (password !== confirmPassword) {
          toast({
            title: "Passwords don't match",
            variant: "destructive"
          });
          return;
        }
        const { error } = await signUp(email, password, fullName || '');
        if (error) throw error;
        toast({
          title: "Account created",
          description: "Welcome to Comet"
        });
      } else {
        const { error } = await signIn(email, password);
        if (error) throw error;
        navigate('/dashboard');
      }
    } catch (error: any) {
      toast({
        title: "Authentication error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuth = async (provider: 'github' | 'google') => {
    try {
      setIsLoading(true);
      await signInWithProvider(provider);
    } catch (error: any) {
      toast({
        title: "Authentication error",
        description: error.message || "Provider not enabled. Please use email/password login or contact administrator.",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md glass-card rounded-2xl p-8 shadow-2xl border border-white/10 backdrop-blur-lg animate-scale-in">
      <div className="mb-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-violet-600 to-primary flex items-center justify-center shadow-lg">
            <Rocket className="h-7 w-7 text-white" />
          </div>
        </div>
        <h2 className="mb-2 text-2xl font-display font-bold text-white tracking-tight">Welcome to Comet</h2>
        <p className="text-sm text-gray-400">Sign in to access your dashboard</p>
      </div>

      <AuthToggle isSignUp={isSignUp} onToggle={setIsSignUp} />

      <div className="space-y-6">
        <OAuthButtons onProviderAuth={handleOAuth} isLoading={isLoading} />

        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-white/10"></div>
          <span className="mx-4 flex-shrink text-xs text-gray-400">or continue with email</span>
          <div className="flex-grow border-t border-white/10"></div>
        </div>

        <AuthForm 
          isSignUp={isSignUp} 
          isLoading={isLoading} 
          onSubmit={handleAuth} 
        />
      </div>
    </div>
  );
}
