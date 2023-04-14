import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import * as path from 'path';
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode !== 'production';
  const isAnalyze = mode === 'analyze';

  return {
    plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
    css: {
      devSourcemap: isDev,
    },
    optimizeDeps: {
      include: ['react'],
    },
    build: {
      commonjsOptions: {
        include: [/node_modules/],
      },
      sourcemap: isAnalyze,
      outDir: 'build',
    },
    esbuild: {
      sourcemap: isDev,
    },
    server: {
      port: 5789,
    },
    preview: {
      port: 5789,
    },
  };
});
