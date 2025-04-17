
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const { signOut } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const performLogout = async () => {
      try {
        console.log("Starting logout process");
        await signOut();
        // The navigate is handled in signOut function, but we'll add a fallback
        setTimeout(() => {
          console.log("Fallback navigation to /auth");
          navigate('/auth');
        }, 2000);
      } catch (err: any) {
        console.error("Logout error:", err);
        setError(err.message || "An error occurred during logout");
        setTimeout(() => {
          navigate('/auth');
        }, 3000);
      }
    };
    
    performLogout();
  }, [signOut, navigate]);
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0A0A23]">
      <div className="text-center">
        {error ? (
          <>
            <div className="mb-4 mx-auto h-12 w-12 text-red-500">❌</div>
            <p className="text-white mb-2">Error during logout: {error}</p>
            <p className="text-gray-400">Redirecting to login...</p>
          </>
        ) : (
          <>
            <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-t-purple-500 mx-auto"></div>
            <p className="text-white">Logging you out...</p>
          </>
        )}
      </div>
    </div>
  );
}
