export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Redirect pages.dev to custom domain
    if (url.hostname === 'explore-capitals-v2.pages.dev') {
      return Response.redirect('https://explorecapitals.com' + url.pathname + url.search, 301);
    }

    // Redirect /index.php to /
    if (url.pathname === '/index.php') {
      return Response.redirect(url.origin + '/', 301);
    }

    // Try to serve the static asset
    const response = await env.ASSETS.fetch(request);

    // If static asset found, return it
    if (response.status !== 404) {
      return response;
    }

    // SPA fallback: serve index.html with 200 for client-side routing
    return env.ASSETS.fetch(new URL('/', url.origin));
  },
};
