
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export function useCredits() {
  const { user } = useAuth();
  const [credits, setCredits] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchCredits();
    } else {
      setCredits(null);
      setLoading(false);
    }
  }, [user]);

  const fetchCredits = async () => {
    if (!user) return;

    try {
      console.log("Fetching credits for user:", user.id);
      const { data, error } = await supabase
        .from('user_credits')
        .select('credits')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error fetching credits:', error);
        throw error;
      }

      console.log("Fetched credits:", data?.credits);
      setCredits(data?.credits ?? 0);
    } catch (error) {
      console.error('Error fetching credits:', error);
      toast({
        title: "Error",
        description: "Could not fetch credits. Please try refreshing the page.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const useCredit = async (): Promise<boolean> => {
    if (!user || credits === null || credits < 1) {
      toast({
        title: "Error",
        description: "Insufficient credits",
        variant: "destructive",
      });
      return false;
    }
    
    try {
      console.log("Using credit for user:", user.id);
      const { data, error } = await supabase
        .from('user_credits')
        .update({ credits: credits - 1 })
        .eq('user_id', user.id)
        .select('credits')
        .single();

      if (error) throw error;

      console.log("Updated credits:", data.credits);
      setCredits(data.credits);
      return true;
    } catch (error) {
      console.error('Error using credit:', error);
      toast({
        title: "Error",
        description: "Could not use credit. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  return { credits, loading, useCredit, refreshCredits: fetchCredits };
}
