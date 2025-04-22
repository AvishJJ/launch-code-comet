
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import Header from '@/components/layout/Header';
import DashboardCTA from '@/components/dashboard/DashboardCTA';
import ApiRequestsList from '@/components/dashboard/ApiRequestsList';
import { Rocket } from 'lucide-react';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth', { replace: true });
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="relative flex flex-col items-center">
          <div className="h-16 w-16 rounded-xl bg-gradient-to-r from-violet-600 to-primary p-3 shadow-xl">
            <div className="h-full w-full animate-spin rounded-lg border-4 border-white/20 border-t-white/80"></div>
          </div>
          <p className="mt-4 text-white/80">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col animate-fade-in">
      {/* Gradient orbs for visual interest */}
      <div className="fixed top-20 left-[20%] h-96 w-96 rounded-full bg-primary/5 blur-[150px] pointer-events-none" />
      <div className="fixed bottom-40 right-[10%] h-72 w-72 rounded-full bg-blue-600/5 blur-[150px] pointer-events-none" />
      
      <Header />
      
      <div className="relative z-0 w-full overflow-hidden">
        {/* Tech/Savvy Vibe Top Section */}
        <section className="relative mx-auto flex w-full max-w-5xl flex-col items-center justify-center pt-10 pb-8 px-4 animate-fade-in">
          <span className="absolute -top-20 left-1/2 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-gradient-to-br from-primary/30 via-blue-500/20 to-purple-400/10 blur-3xl" />
          
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 via-primary to-blue-600 shadow-lg">
              <Rocket className="h-6 w-6 text-white" />
            </span>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-gradient tracking-tight">
              Comet Dashboard
            </h1>
          </div>
          
          <p className="max-w-lg text-center text-base md:text-lg text-gray-300 mb-2 font-medium">
            Welcome back, <span className="font-semibold text-primary">{user?.email?.split("@")[0]}</span>.<br />
            Your API journey is ready for launch.
          </p>
        </section>
      </div>
      
      <main className="container mx-auto flex-1 px-4 py-5 max-w-5xl">
        <section className="mb-10 animate-fade-in">
          <DashboardCTA />
        </section>
        <section className="animate-fade-in">
          <ApiRequestsList />
        </section>
      </main>
    </div>
  );
}
