
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
    }
  }, [user]);

  const fetchCredits = async () => {
    try {
      const { data, error } = await supabase
        .from('user_credits')
        .select('credits')
        .eq('user_id', user?.id)
        .single();

      if (error) throw error;
      setCredits(data.credits);
    } catch (error) {
      console.error('Error fetching credits:', error);
      toast({
        title: "Error",
        description: "Could not fetch credits",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const useCredit = async (): Promise<boolean> => {
    if (!user) return false;
    
    try {
      const { data, error } = await supabase
        .from('user_credits')
        .update({ credits: credits! - 1 })
        .eq('user_id', user.id)
        .select('credits')
        .single();

      if (error) throw error;
      setCredits(data.credits);
      return true;
    } catch (error) {
      console.error('Error using credit:', error);
      toast({
        title: "Error",
        description: "Could not use credit",
        variant: "destructive",
      });
      return false;
    }
  };

  return { credits, loading, useCredit, refreshCredits: fetchCredits };
}
