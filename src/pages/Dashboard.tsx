
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
      <div className="flex min-h-screen items-center justify-center bg-[#0A0A23]">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-t-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tl from-[#191525] via-[#0A0A23] to-[#221F26] animate-fade-in flex flex-col">
      <Header />
      <div className="relative z-0 w-full overflow-hidden">
        {/* Tech/Savvy Vibe Top Section */}
        <section className="relative mx-auto flex w-full max-w-5xl flex-col items-center justify-center pt-8 pb-7 animate-fade-in">
          <span className="absolute -top-24 left-1/2 -z-10 h-[340px] w-[340px] -translate-x-1/2 rounded-full bg-gradient-to-br from-purple-700/50 via-blue-500/20 to-pink-400/20 blur-3xl" />
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-b from-blue-600/80 via-[#7E69AB] to-purple-700/70 shadow-xl">
              <Rocket className="h-7 w-7 text-white" />
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-tr from-purple-300 via-purple-100 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_2px_6px_rgba(155,135,245,.26)]">
              Comet Dashboard
            </h1>
          </div>
          <p className="max-w-lg text-center text-base md:text-lg text-gray-300 mb-2 font-medium">
            Welcome back, <span className="font-semibold text-[#9b87f5]">{user?.email?.split("@")[0]}</span>.<br />
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
