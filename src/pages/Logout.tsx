
import { useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';

export default function Logout() {
  const { signOut } = useAuth();
  
  useEffect(() => {
    const performLogout = async () => {
      await signOut();
    };
    
    performLogout();
  }, [signOut]);
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0A0A23]">
      <div className="text-center">
        <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-t-purple-500 mx-auto"></div>
        <p className="text-white">Logging you out...</p>
      </div>
    </div>
  );
}
