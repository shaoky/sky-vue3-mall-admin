<template>
  <div class="footer">
    <div class="footer-item">1</div>
    <div class="footer-item">2</div>
    <div class="footer-item">3</div>
    <div class="footer-item">4</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  
})
</script>

<style lang="less" scoped>
.footer {
  position: fixed;
  bottom: 0;
  display: flex;
}
.footer-item {
  flex: 1;
}
</style>