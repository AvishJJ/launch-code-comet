
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface AuthFormProps {
  isSignUp: boolean;
  isLoading: boolean;
  onSubmit: (data: { email: string; password: string; fullName?: string; confirmPassword?: string }) => void;
}

export function AuthForm({ isSignUp, isLoading, onSubmit }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email, password, fullName, confirmPassword });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {isSignUp && (
        <div className="space-y-1.5">
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-300">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-secondary/60 px-4 py-2.5 text-white placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors"
            placeholder="Your name"
            required={isSignUp}
          />
        </div>
      )}
      <div className="space-y-1.5">
        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-secondary/60 px-4 py-2.5 text-white placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors"
          placeholder="you@example.com"
          required
        />
      </div>
      <div className="space-y-1.5">
        <label htmlFor="password" className="block text-sm font-medium text-gray-300">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-secondary/60 px-4 py-2.5 text-white placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors"
          placeholder="••••••••"
          required
        />
      </div>

      {isSignUp && (
        <div className="space-y-1.5">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-secondary/60 px-4 py-2.5 text-white placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors"
            placeholder="••••••••"
            required={isSignUp}
          />
        </div>
      )}

      <button
        type="submit"
        className="w-full mt-6 relative rounded-lg overflow-hidden bg-gradient-to-r from-violet-700 via-primary to-blue-500 p-[1px] font-medium text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 group animate-gradient-shift"
        disabled={isLoading}
      >
        <span className="flex items-center justify-center gap-2 rounded-lg bg-background px-6 py-2.5 transition-all duration-200 group-hover:bg-opacity-0 text-center">
          {isLoading ? 'Processing...' : 'Launch Comet'} 
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </button>
    </form>
  );
}
