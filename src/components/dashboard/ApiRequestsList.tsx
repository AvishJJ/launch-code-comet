
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/use-auth';
import { toast } from '@/hooks/use-toast';
import { Download, Clock, CheckCircle, AlertCircle } from 'lucide-react';

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
      <div className="py-8 text-center text-gray-400 animate-fade-in">
        <span className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#7E69AB] to-[#1EAEDB]">
          <Clock className="h-8 w-8 animate-pulse text-white" />
        </span>
        <p className="mt-2 text-lg font-medium text-white/70">Loading your API requests...</p>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="rounded-lg border border-white/10 bg-gradient-to-br from-[#1E1E3F]/70 to-[#7E69AB]/10 p-8 text-center shadow-lg animate-fade-in">
        <p className="text-gray-300 text-lg">You haven't created any API requests yet.</p>
        <p className="mt-2 text-sm text-gray-400">Click <span className="font-semibold text-purple-300">"Build Me an API"</span> to get started.</p>
      </div>
    );
  }

  return (
    <div className="mt-8 animate-fade-in">
      <h2 className="mb-4 text-2xl font-bold text-white tracking-tight">Your API Requests</h2>
      <div className="space-y-5">
        {requests.map((request) => (
          <div 
            key={request.id} 
            className="rounded-xl border border-white/10 bg-gradient-to-tr from-[#232245]/80 to-[#7E69AB]/10 p-5 shadow-md hover:border-purple-500/40 transition-all duration-300 flex items-center justify-between hover:scale-[1.02]"
          >
            <div>
              <p className="text-xs text-gray-400">
                {new Date(request.created_at).toLocaleString()}
              </p>
              <p className="mt-1 text-lg text-white font-medium">{request.prompt}</p>
            </div>
            <div className="flex items-center">
              {request.status === 'pending' && (
                <div className="flex items-center rounded-full bg-yellow-500/30 px-3 py-1 text-xs text-yellow-300 font-semibold mr-2">
                  <Clock className="mr-1 h-3 w-3" />
                  Pending
                </div>
              )}
              {request.status === 'completed' && (
                <div className="flex items-center rounded-full bg-green-500/25 px-3 py-1 text-xs text-green-200 font-semibold mr-2">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  Completed
                </div>
              )}
              {request.status === 'failed' && (
                <div className="flex items-center rounded-full bg-red-500/30 px-3 py-1 text-xs text-red-200 font-semibold mr-2">
                  <AlertCircle className="mr-1 h-3 w-3" />
                  Failed
                </div>
              )}

              {request.zip_url && (
                <a 
                  href={request.zip_url}
                  download
                  className="ml-2 flex items-center rounded-full bg-blue-500/20 px-3 py-1 text-xs text-blue-200 font-semibold hover:bg-blue-500/40 transition-all animate-pulse"
                >
                  <Download className="mr-1 h-3 w-3" />
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
