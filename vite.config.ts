import { defineConfig, loadEnv, type UserConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import svgrPlugin from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default function config({ mode }: UserConfig) {
  if (mode != null) {
    process.env = { ...loadEnv(mode, process.cwd(), '') }
  }
  /*
      Warning: Do not use the define config object for process.env except for specific non-sensitive environment variables.
      Defining process.env as follows will result in exposing all process.env variables to the app:
      define: {
          'process.env': process.env
      }
    */
  return defineConfig({
    plugins: [react({}), viteTsconfigPaths(), svgrPlugin()],
    server: {
      open: true,
      port: 3000,
    },
    resolve: {
      alias: {
        // Could automatically pull path aliases from tsconfig.json
        // However, explicitly added path alias allows paths to be used from .scss files
        '@': '/src',
      },
    },
  })
}
