
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthCard from '@/components/auth/AuthCard';
import { useAuth } from '@/hooks/use-auth';
import Footer from '@/components/landing/Footer';

export default function Auth() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Smooth fade-out before navigation to dashboard
    if (user && !loading) {
      if (pageRef.current) {
        pageRef.current.classList.add('animate-fade-out');
        setTimeout(() => {
          navigate('/dashboard', { replace: true });
        }, 350);
      } else {
        navigate('/dashboard', { replace: true });
      }
    }
  }, [user, loading, navigate]);

  return (
    <div ref={pageRef} className="flex min-h-screen flex-col bg-[#0A0A23] animate-fade-in">
      <main className="flex flex-1 items-center justify-center py-16">
        <AuthCard />
      </main>
      <Footer />
    </div>
  );
}
