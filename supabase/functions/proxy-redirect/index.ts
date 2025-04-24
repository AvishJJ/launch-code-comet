
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
    
    // Return an HTML response with multiple redirect mechanisms
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta http-equiv="refresh" content="0;url=${TALLY_FORM_URL}">
          <title>Redirecting to Tally Form</title>
          <script>
            // Immediate redirect
            window.location.replace("${TALLY_FORM_URL}");
            
            // Fallback redirect after a short delay
            setTimeout(function() {
              window.location.href = "${TALLY_FORM_URL}";
            }, 500);
          </script>
        </head>
        <body>
          <p>Redirecting to form... If you are not redirected automatically, <a href="${TALLY_FORM_URL}">click here</a>.</p>
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
