import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import morgan from 'morgan';

// https://vite.dev/config/
export default defineConfig({
  plugins: [morganPlugin(), react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3002',
      },
    },
  },
})

function morganPlugin() {
  return {
    name: "morgan-plugin",
    configureServer(server) {
      return () => {
        server.middlewares.use(morgan("tiny"));
      };
    },
  };
}
