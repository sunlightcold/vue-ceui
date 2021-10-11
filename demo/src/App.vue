<template>
  <div>
    <CeButton name="测试" />
    <ElButton>测试</ElButton>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// @ts-ignore
import { CeButton } from '@vue-ceui/components';
import { ElButton } from 'element-plus';
import 'element-plus/dist/index.css';
import '@vue-ceui/themes/src/index.scss';

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
