import { resolve } from 'path'
import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const config = {
    base: './',
    build: {
      sourcemap: false,
      chunkSizeWarningLimit: 1024
    },
    plugins: [createVuePlugin()]
  }

  if (mode === 'lib') {
    config.build.lib = {
      entry: resolve(__dirname, 'src/lib/index.js'),
      name: 'ElSelect2',
      fileName: format => `el-select2.${format}.js`
    }
    config.build.rollupOptions = {
      external: ['vue-virtual-scroll-list'],
      output: {
        globals: {
          'vue-virtual-scroll-list': 'VirtualList'
        }
      }
    }
  }

  return config
})
