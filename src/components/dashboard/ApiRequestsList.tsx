
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
      <div className="py-8 text-center text-gray-400">
        <Clock className="mx-auto mb-2 h-8 w-8 animate-pulse" />
        <p>Loading your API requests...</p>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="rounded-lg border border-white/10 bg-[#1E1E3F]/30 p-6 text-center">
        <p className="text-gray-400">You haven't created any API requests yet.</p>
        <p className="mt-2 text-sm text-gray-500">Click "Build Me an API" to get started.</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-xl font-semibold text-white">Your API Requests</h2>
      <div className="space-y-4">
        {requests.map((request) => (
          <div 
            key={request.id} 
            className="rounded-lg border border-white/10 bg-[#1E1E3F]/30 p-4 transition-all hover:border-purple-500/30"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">
                  {new Date(request.created_at).toLocaleString()}
                </p>
                <p className="mt-1 text-white">{request.prompt}</p>
              </div>
              <div className="flex items-center">
                {request.status === 'pending' && (
                  <div className="flex items-center rounded-full bg-yellow-500/20 px-3 py-1 text-xs text-yellow-300">
                    <Clock className="mr-1 h-3 w-3" />
                    Pending
                  </div>
                )}
                {request.status === 'completed' && (
                  <div className="flex items-center rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-300">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Completed
                  </div>
                )}
                {request.status === 'failed' && (
                  <div className="flex items-center rounded-full bg-red-500/20 px-3 py-1 text-xs text-red-300">
                    <AlertCircle className="mr-1 h-3 w-3" />
                    Failed
                  </div>
                )}
                
                {request.zip_url && (
                  <a 
                    href={request.zip_url}
                    download
                    className="ml-3 flex items-center rounded-full bg-blue-500/20 px-3 py-1 text-xs text-blue-300 hover:bg-blue-500/30"
                  >
                    <Download className="mr-1 h-3 w-3" />
                    Download
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
