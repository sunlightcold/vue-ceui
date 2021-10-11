<template>
  <div>
    <CeButton name="测试" />
    <ElButton>测试</ElButton>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CeButton } from '@vue-ceui/components';
import { ElButton } from 'element-plus';
import 'element-plus/dist/index.css';
// import { CeButton } from '../dist/es';
// import '../dist/themes/index.css';

export default defineComponent({
  components: {
    CeButton,
    ElButton,
  },
  setup() {
    return {};
  },
});
</script>
