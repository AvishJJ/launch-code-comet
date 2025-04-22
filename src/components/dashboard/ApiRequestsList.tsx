
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/use-auth';
import { toast } from '@/hooks/use-toast';
import { Download, Clock, CheckCircle, AlertCircle, Package } from 'lucide-react';

interface ApiRequest {
  id: string;
  prompt: string;
  status: string;
  created_at: string;
  zip_url: string | null;
}

export default function ApiRequestsList() {
  const { user } = useAuth();
  const [requests, setRequests] = useState<ApiRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchRequests = async () => {
      try {
        const { data, error } = await supabase
          .from('api_requests')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setRequests(data || []);
      } catch (error: any) {
        toast({
          title: "Error loading requests",
          description: error.message,
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();

    // Subscribe to realtime changes
    const channel = supabase
      .channel('schema-db-changes')
      .on('postgres_changes', 
        {
          event: '*',
          schema: 'public',
          table: 'api_requests'
        }, 
        (payload) => {
          console.log('Change received!', payload);
          // Refresh data when changes occur
          fetchRequests();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  if (loading) {
    return (
      <div className="py-10 text-center animate-fade-in">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-4 h-14 w-14 rounded-xl bg-gradient-to-br from-violet-600 to-primary p-3 shadow-xl">
            <div className="h-full w-full animate-spin rounded-lg border-3 border-white/20 border-t-white/80"></div>
          </div>
          <p className="text-lg font-medium text-white/70">Loading your API requests...</p>
        </div>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="glass-card p-10 text-center animate-fade-in relative overflow-hidden">
        <span className="absolute inset-0 bg-gradient-to-r from-violet-900/5 to-blue-900/5 animate-pulse-subtle"></span>
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-secondary mx-auto">
          <Package className="h-8 w-8 text-primary/80" />
        </div>
        <p className="text-gray-300 text-lg font-medium mb-2">You haven't created any API requests yet.</p>
        <p className="text-sm text-gray-400">Click <span className="font-semibold text-primary">"Build Me an API"</span> to get started.</p>
      </div>
    );
  }

  return (
    <div className="mt-8 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-display font-bold text-white tracking-tight">Your API Requests</h2>
        <div className="text-sm text-gray-400 font-medium">{requests.length} {requests.length === 1 ? 'request' : 'requests'}</div>
      </div>
      
      <div className="space-y-4">
        {requests.map((request) => (
          <div 
            key={request.id} 
            className="glass-card rounded-xl p-5 transition-all duration-300 flex items-center justify-between hover:scale-[1.01] group"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <p className="text-xs text-gray-400">
                  {new Date(request.created_at).toLocaleString()}
                </p>
                
                {request.status === 'pending' && (
                  <div className="flex items-center rounded-full bg-yellow-500/20 px-3 py-1 text-xs text-yellow-300 font-medium">
                    <Clock className="mr-1 h-3 w-3" />
                    Pending
                  </div>
                )}
                {request.status === 'completed' && (
                  <div className="flex items-center rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-200 font-medium">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Completed
                  </div>
                )}
                {request.status === 'failed' && (
                  <div className="flex items-center rounded-full bg-red-500/20 px-3 py-1 text-xs text-red-200 font-medium">
                    <AlertCircle className="mr-1 h-3 w-3" />
                    Failed
                  </div>
                )}
              </div>
              
              <p className="text-lg text-white font-medium">{request.prompt}</p>
            </div>
            
            <div className="flex items-center">
              {request.zip_url && (
                <a 
                  href={request.zip_url}
                  download
                  className="ml-2 flex items-center rounded-lg bg-primary/10 px-4 py-2 text-sm text-primary font-medium hover:bg-primary/20 transition-all group-hover:animate-pulse-subtle"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
