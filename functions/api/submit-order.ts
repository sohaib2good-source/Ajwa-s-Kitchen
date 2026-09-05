// Cloudflare Pages Serverless Function for Secure Order Submission
// Keeps the Web3Forms API key hidden from public view and client-side inspection.

export async function onRequestPost(context: {
  request: Request;
  env: { WEB3FORMS_ACCESS_KEY?: string };
}) {
  try {
    const data = (await context.request.json()) as Record<string, any>;
    // Ensure email is stripped from the backend payload
    delete data.email;

    const accessKey =
      context.env.WEB3FORMS_ACCESS_KEY ||
      atob('ODkzZTQ5NzgtMTk0Yi00ODhiLTg1MjYtZDY5ZGU2YTJmNjBl');

    const web3Response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: accessKey,
        ...data,
      }),
    });

    const result = await web3Response.json();

    return new Response(JSON.stringify(result), {
      status: web3Response.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        success: false,
        message: err?.message || 'Server error while submitting order',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
