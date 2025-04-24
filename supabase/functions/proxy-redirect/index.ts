
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log("Received redirect request")
    
    const TALLY_FORM_URL = 'https://tally.so/r/mB9VN5'
    
    // Return an HTML response that performs the redirect
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta http-equiv="refresh" content="0;url=${TALLY_FORM_URL}">
        </head>
        <body>
          <p>Redirecting to form...</p>
          <script>window.location.replace("${TALLY_FORM_URL}");</script>
        </body>
      </html>
    `;

    return new Response(html, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/html'
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
