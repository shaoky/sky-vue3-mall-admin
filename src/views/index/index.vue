<template>
    <div class="index-container">
        <div class="top">
            <div class="title">下午好！admin</div>
            <div class="content">
               
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { getIndexData } from '../..//api/getData'


export default defineComponent({
  name: 'index',
  components: {
  },
  setup() {
   

  }
})
</script>
<style lang="less">
.index-container{background: #f5f5f5;
    .top{background: #fff; padding: 0 40px; padding-bottom: 50px;
        .title{height: 60px; line-height: 60px; font-size: 18px; color: #606266;}
        .content{display: flex; margin-top: 10px;
        }
    }
}
</style>
