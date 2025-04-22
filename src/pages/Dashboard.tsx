
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import Header from '@/components/layout/Header';
import DashboardCTA from '@/components/dashboard/DashboardCTA';
import ApiRequestsList from '@/components/dashboard/ApiRequestsList';

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
    <div className="min-h-screen bg-gradient-to-tl from-[#1A1F2C] via-[#0A0A23] to-[#221F26] animate-fade-in">
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <section className="mb-12 animate-fade-in">
          <DashboardCTA />
        </section>
        <section className="animate-fade-in">
          <ApiRequestsList />
        </section>
      </main>
    </div>
  );
}
