import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3001
  },
  plugins: [
    vue(),
    // 解决vue3下script setup语法糖下，手动设置组件name不方便的问题，可能会导致vue组件debuger时，断点位置不正确问题，使用前请慎重（直至0.4.0版本依旧有该问题）
    vueSetupExtend()
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
})
