
import { Github } from 'lucide-react';
import { useState } from 'react';

interface OAuthButtonsProps {
  onProviderAuth: (provider: 'github' | 'google') => Promise<void>;
  isLoading: boolean;
}

export function OAuthButtons({ onProviderAuth, isLoading: parentIsLoading }: OAuthButtonsProps) {
  const [providerLoading, setProviderLoading] = useState<'github' | 'google' | null>(null);
  const isLoading = parentIsLoading || providerLoading !== null;

  const handleProviderAuth = async (provider: 'github' | 'google') => {
    try {
      setProviderLoading(provider);
      console.log(`Initiating ${provider} authentication...`);
      await onProviderAuth(provider);
      // Note: We don't reset loading state as the redirect will happen
    } catch (error) {
      console.error(`Failed to authenticate with ${provider}:`, error);
      setProviderLoading(null);
    }
  };

  return (
    <div className="space-y-3">
      <button
        onClick={() => handleProviderAuth('github')}
        className="relative flex w-full items-center justify-center rounded-lg bg-secondary/70 px-4 py-2.5 text-white shadow-sm hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-1 focus:ring-offset-background disabled:opacity-70 transition-colors border border-white/5"
        disabled={isLoading}
      >
        {providerLoading === 'github' ? (
          <span className="absolute left-4 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
        ) : (
          <Github className="mr-2 h-5 w-5" />
        )}
        {providerLoading === 'github' ? 'Connecting...' : 'Continue with GitHub'}
      </button>
      <button
        onClick={() => handleProviderAuth('google')}
        className="relative flex w-full items-center justify-center rounded-lg bg-white px-4 py-2.5 text-gray-800 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-1 focus:ring-offset-background disabled:opacity-70 transition-colors"
        disabled={isLoading}
      >
        {providerLoading === 'google' ? (
          <span className="absolute left-4 h-5 w-5 animate-spin rounded-full border-2 border-gray-800 border-t-transparent"></span>
        ) : (
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
        )}
        {providerLoading === 'google' ? 'Connecting...' : 'Continue with Google'}
      </button>
    </div>
  );
}
