import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useCredits } from '@/hooks/use-credits';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Rocket, ArrowRight, Code, Database, Coins } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function DashboardCTA() {
  const { user } = useAuth();
  const { credits, loading: creditsLoading } = useCredits();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleBuildClick = () => {
    if (credits === 0) {
      toast({
        title: "No credits remaining",
        description: "Please wait for your daily credit refresh",
        variant: "destructive",
      });
      return;
    }
    setShowConfirmDialog(true);
  };

  const handleConfirm = async () => {
    setIsRedirecting(true);
    try {
      if (user) {
        // First try to use a credit
        const { error } = await supabase.from('user_credits')
          .update({ credits: credits! - 1 })
          .eq('user_id', user.id);

        if (error) throw error;

        // Then record the API request
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
        description: "Could not process your request",
        variant: "destructive"
      });
      setIsRedirecting(false);
    }
  };

  return (
    <section className="rounded-2xl glass-card overflow-hidden animate-fade-in border border-white/5 shadow-2xl relative">
      {/* Top color band */}
      <div className="h-2 w-full bg-gradient-to-r from-violet-600 via-primary to-blue-600 animate-gradient-shift bg-[length:200%_auto]"></div>
      
      <div className="p-8">
        <div className="mx-auto max-w-4xl">
          {/* Modern heading with icon and glowing effect */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-3 p-1 rounded-xl bg-gradient-to-r from-violet-500/20 to-primary/20 backdrop-blur-sm">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-violet-600 to-primary flex items-center justify-center shadow-lg">
                <Rocket className="h-6 w-6 text-white" />
              </div>
              <h2 className="pr-4 text-2xl font-display font-bold tracking-tight text-gradient">
                Your API Launchpad
              </h2>
            </div>
          </div>

          {/* Feature grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex flex-col items-center p-4 rounded-xl bg-secondary/20 border border-white/5 backdrop-blur-sm">
              <div className="mb-3 h-10 w-10 rounded-full bg-gradient-to-r from-violet-600/30 to-primary/30 flex items-center justify-center">
                <Code className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-white font-medium text-center mb-1">Custom APIs</h3>
              <p className="text-sm text-gray-400 text-center">Tailored to your exact specifications</p>
            </div>
            
            <div className="flex flex-col items-center p-4 rounded-xl bg-secondary/20 border border-white/5 backdrop-blur-sm">
              <div className="mb-3 h-10 w-10 rounded-full bg-gradient-to-r from-blue-600/30 to-cyan-500/30 flex items-center justify-center">
                <Database className="h-5 w-5 text-blue-400" />
              </div>
              <h3 className="text-white font-medium text-center mb-1">Full Backend</h3>
              <p className="text-sm text-gray-400 text-center">Database, auth, and all required endpoints</p>
            </div>
            
            <div className="flex flex-col items-center p-4 rounded-xl bg-secondary/20 border border-white/5 backdrop-blur-sm">
              <div className="mb-3 h-10 w-10 rounded-full bg-gradient-to-r from-green-600/30 to-emerald-500/30 flex items-center justify-center">
                <Rocket className="h-5 w-5 text-green-400" />
              </div>
              <h3 className="text-white font-medium text-center mb-1">Ready to Deploy</h3>
              <p className="text-sm text-gray-400 text-center">From prompt to production in minutes</p>
            </div>
          </div>

          <div className="mx-auto mb-6 flex items-center justify-center gap-2 text-gray-300">
            <Coins className="h-5 w-5 text-primary" />
            <span>
              {creditsLoading ? "Loading credits..." : `${credits} credits remaining`}
            </span>
          </div>

          <p className="mx-auto mb-8 max-w-xl text-base md:text-lg text-center text-gray-300">
            From prompt to production, in one click.<br />
            <span className="text-primary font-semibold">Your API backend project is just a step away.</span>
          </p>
          
          <div className="flex justify-center">
            <button 
              onClick={handleBuildClick}
              disabled={isRedirecting || credits === 0}
              className="relative rounded-xl overflow-hidden bg-gradient-to-r from-violet-700 via-primary to-blue-500 p-[1px] font-medium text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 group hover:shadow-primary/20 hover:shadow-xl transition-all duration-300 animate-gradient-shift bg-[length:200%_auto]"
            >
              <span className="flex items-center justify-center gap-2 rounded-lg bg-background px-8 py-3.5 transition-all duration-200 group-hover:bg-opacity-0">
                <Rocket className="h-5 w-5" />
                <span className="font-semibold">
                  {isRedirecting ? 'Redirecting...' : credits === 0 ? 'No credits remaining' : 'Build Me an API'}
                </span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
          </div>
        </div>
      </div>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Use 1 Credit</AlertDialogTitle>
            <AlertDialogDescription>
              This action will use 1 credit from your account. You currently have {credits} credits.
              Credits refresh daily at midnight UTC.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
