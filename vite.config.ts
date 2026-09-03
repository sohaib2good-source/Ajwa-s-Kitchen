import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

function orderApiPlugin() {
  return {
    name: 'order-api-dev-middleware',
    configureServer(server: any) {
      server.middlewares.use('/api/submit-order', (req: any, res: any) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }
        let body = '';
        req.on('data', (chunk: any) => {
          body += chunk;
        });
        req.on('end', async () => {
          try {
            const data = JSON.parse(body);
            const accessKey =
              process.env.WEB3FORMS_ACCESS_KEY ||
              process.env.VITE_WEB3FORMS_ACCESS_KEY ||
              Buffer.from('ODkzZTQ5NzgtMTk0Yi00ODhiLTg1MjYtZDY5ZGU2YTJmNjBl', 'base64').toString('utf-8');

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
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = web3Response.status;
            res.end(JSON.stringify(result));
          } catch (err: any) {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 500;
            res.end(
              JSON.stringify({
                success: false,
                message: err?.message || 'Error processing request',
              })
            );
          }
        });
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), orderApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
