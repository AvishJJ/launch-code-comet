
import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { GitHub, Mail } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export default function AuthCard() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp, signInWithProvider } = useAuth();
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
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
        const { error } = await signUp(email, password, fullName);
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
      await signInWithProvider(provider);
    } catch (error: any) {
      toast({
        title: "Authentication error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="w-full max-w-md rounded-lg border border-white/10 bg-[#0A0A23]/80 p-6 shadow-xl backdrop-blur-sm">
      <div className="mb-6 text-center">
        <h2 className="mb-2 text-2xl font-bold text-white">Welcome to Comet</h2>
        <p className="text-sm text-gray-400">Sign in to access your dashboard</p>
      </div>

      <div className="mb-6">
        <div className="flex">
          <button
            onClick={() => setIsSignUp(false)}
            className={`flex-1 border-b-2 pb-2 text-center transition-all ${
              !isSignUp
                ? 'border-purple-500 text-white'
                : 'border-transparent text-gray-400'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsSignUp(true)}
            className={`flex-1 border-b-2 pb-2 text-center transition-all ${
              isSignUp
                ? 'border-purple-500 text-white'
                : 'border-transparent text-gray-400'
            }`}
          >
            Sign Up
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <button
          onClick={() => handleOAuth('github')}
          className="flex w-full items-center justify-center rounded-md border border-white/10 bg-[#24292e] px-4 py-2 text-white hover:bg-[#2c3338] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#0A0A23]"
          disabled={isLoading}
        >
          <GitHub className="mr-2 h-5 w-5" />
          Continue with GitHub
        </button>
        <button
          onClick={() => handleOAuth('google')}
          className="flex w-full items-center justify-center rounded-md border border-white/10 bg-white px-4 py-2 text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#0A0A23]"
          disabled={isLoading}
        >
          <svg
            className="mr-2 h-5 w-5"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
              <path
                fill="#4285F4"
                d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
              />
              <path
                fill="#34A853"
                d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
              />
              <path
                fill="#FBBC05"
                d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
              />
              <path
                fill="#EA4335"
                d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
              />
            </g>
          </svg>
          Continue with Google
        </button>

        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-white/10"></div>
          <span className="mx-4 flex-shrink text-xs text-gray-400">or continue with email</span>
          <div className="flex-grow border-t border-white/10"></div>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          {isSignUp && (
            <div>
              <label htmlFor="fullName" className="mb-1 block text-sm text-gray-300">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-md border border-white/10 bg-[#1E1E3F] px-4 py-2 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Your name"
                required={isSignUp}
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="mb-1 block text-sm text-gray-300">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-white/10 bg-[#1E1E3F] px-4 py-2 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-sm text-gray-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-white/10 bg-[#1E1E3F] px-4 py-2 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="••••••••"
              required
            />
          </div>

          {isSignUp && (
            <div>
              <label htmlFor="confirmPassword" className="mb-1 block text-sm text-gray-300">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-md border border-white/10 bg-[#1E1E3F] px-4 py-2 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="••••••••"
                required={isSignUp}
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full animate-pulse rounded-md bg-gradient-to-r from-purple-600 to-blue-500 px-4 py-2 font-medium text-white hover:from-purple-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#0A0A23] disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Launch Comet'} 
          </button>
        </form>
      </div>
    </div>
  );
}
