
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
    
    // Return an HTML response with improved redirect handling
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta http-equiv="refresh" content="0;url=${TALLY_FORM_URL}">
          <title>Redirecting to Tally Form</title>
          <script>
            // Force immediate redirect
            window.location.href = "${TALLY_FORM_URL}";
            
            // In case the first redirect fails
            setTimeout(function() {
              window.location.replace("${TALLY_FORM_URL}");
            }, 100);
          </script>
        </head>
        <body style="font-family: Arial, sans-serif; text-align: center; padding: 40px; color: #666;">
          <h2>Redirecting you to the form...</h2>
          <p>If you are not redirected automatically, <a href="${TALLY_FORM_URL}" style="color: #4f46e5; font-weight: bold;">click here</a>.</p>
        </body>
      </html>
    `;

    return new Response(html, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/html',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
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
