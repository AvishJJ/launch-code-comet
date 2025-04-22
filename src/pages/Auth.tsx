
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthCard from '@/components/auth/AuthCard';
import { useAuth } from '@/hooks/use-auth';
import Footer from '@/components/landing/Footer';
import { Rocket } from 'lucide-react';

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
    <div ref={pageRef} className="flex min-h-screen flex-col bg-background animate-fade-in">
      {/* Gradient orbs for visual interest */}
      <div className="fixed top-20 -left-32 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
      <div className="fixed bottom-0 right-0 h-96 w-96 rounded-full bg-blue-600/10 blur-[100px]" />
      
      <header className="container mx-auto pt-8 px-4">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-r from-violet-600 to-primary shadow-lg">
            <Rocket className="h-5 w-5 text-white" />
          </span>
          <h1 className="text-xl font-display font-semibold text-gradient">Comet</h1>
        </div>
      </header>
      
      <main className="flex flex-1 items-center justify-center py-16 px-4">
        <AuthCard />
      </main>
      
      <Footer />
    </div>
  );
}
