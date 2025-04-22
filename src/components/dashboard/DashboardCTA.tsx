
import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Rocket } from 'lucide-react';

export default function DashboardCTA() {
  const { user } = useAuth();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleBuildClick = async () => {
    setIsRedirecting(true);
    try {
      if (user) {
        await supabase.from('api_requests').insert({
          user_id: user.id,
          prompt: 'User initiated API build from dashboard',
          status: 'pending'
        });
      }
      window.location.href = 'https://tally.so/r/mB9VN5';
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not record your request",
        variant: "destructive"
      });
      setIsRedirecting(false);
    }
  };

  return (
    <section className="p-8 rounded-xl bg-gradient-to-br from-[#221F26]/80 to-[#7E69AB]/20 shadow-xl border border-[#232245]/60 
      transition-all duration-300 hover:shadow-2xl animate-fade-in backdrop-blur-md hover:scale-[1.03]">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-3 flex justify-center items-center gap-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
          <Rocket className="h-7 w-7 text-purple-300 drop-shadow" />
          Your API Launchpad
        </h2>
        <p className="mx-auto mb-8 max-w-xl text-base md:text-lg text-gray-300">
          From prompt to production, in one click.<br />
          <span className="text-[#9b87f5] font-semibold">Your API backend project is just a step away.</span>
        </p>
        <button 
          onClick={handleBuildClick}
          disabled={isRedirecting}
          className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 text-lg font-semibold text-white shadow-md hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all duration-300"
        >
          <span className="relative flex items-center rounded-md bg-[#0A0A23] px-7 py-3.5 transition-all duration-100 ease-in group-hover:bg-opacity-0">
            <Rocket className="mr-2 h-5 w-5" />
            <span className="relative">{isRedirecting ? 'Redirecting...' : 'Build Me an API'}</span>
          </span>
        </button>
      </div>
    </section>
  );
}
