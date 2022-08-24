import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import { visualizer } from 'rollup-plugin-visualizer'

const lifecycle = process.env.npm_lifecycle_event

export default defineConfig({
  server: {
    port: 3001
  },
  plugins: [
    vue(),
    // 解决vue3下script setup语法糖下，手动设置组件name不方便的问题，可能会导致vue组件debuger时，断点位置不正确问题，使用前请慎重（直至0.4.0版本依旧有该问题）
    vueSetupExtend(),
    // 打包分析
    lifecycle === 'report'
      ? visualizer({open: true, brotliSize: true, filename: 'report.html'})
      : null,
    AutoImport({
      dts: 'src/types/auto-imports.d.ts',
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      dts: 'src/types/components.d.ts',
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
})
