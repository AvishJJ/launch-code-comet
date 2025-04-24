
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log("Received redirect request")
    
    // The actual URL we want to redirect to
    const TALLY_FORM_URL = 'https://tally.so/r/mB9VN5'
    
    // Return a redirect response
    return new Response(null, {
      status: 302,
      headers: {
        ...corsHeaders,
        'Location': TALLY_FORM_URL
      }
    })
  } catch (error) {
    console.error('Error in proxy-redirect function:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
