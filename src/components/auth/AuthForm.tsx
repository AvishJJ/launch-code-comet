
import { useState } from 'react';

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
  );
}
