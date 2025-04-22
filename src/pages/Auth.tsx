
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthCard from '@/components/auth/AuthCard';
import { useAuth } from '@/hooks/use-auth';
import Footer from '@/components/landing/Footer';

export default function Auth() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !loading) {
      // Add fade animation for smoothness
      navigate('/dashboard', { replace: true });
    }
  }, [user, loading, navigate]);

  return (
    <div className="flex min-h-screen flex-col bg-[#0A0A23] animate-fade-in">
      <main className="flex flex-1 items-center justify-center py-16">
        <AuthCard />
      </main>
      <Footer />
    </div>
  );
}
