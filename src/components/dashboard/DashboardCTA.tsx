
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
      // Record the API request in Supabase
      if (user) {
        await supabase.from('api_requests').insert({
          user_id: user.id,
          prompt: 'User initiated API build from dashboard',
          status: 'pending'
        });
      }
      
      // Redirect to Tally form
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
    <section className="py-10">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Your API Launchpad
        </h1>
        <p className="mx-auto mb-8 max-w-xl text-lg text-gray-400">
          Your API backend project is just a prompt away.
        </p>
        
        <button 
          onClick={handleBuildClick}
          disabled={isRedirecting}
          className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 text-lg font-medium text-white hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 dark:focus:ring-blue-800"
        >
          <span className="relative flex items-center rounded-md bg-[#0A0A23] px-6 py-3.5 transition-all duration-75 ease-in group-hover:bg-opacity-0">
            <Rocket className="mr-2 h-5 w-5" />
            <span className="relative">{isRedirecting ? 'Redirecting...' : '🚀 Build Me an API'}</span>
          </span>
        </button>
      </div>
    </section>
  );
}
