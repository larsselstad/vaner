import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        visualizer({
            filename: './dist/stats.html',
            // change to true to automatically open the visualization in the default browser
            open: false
        })
    ]
});
