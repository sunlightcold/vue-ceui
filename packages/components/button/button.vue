<template>
  <div>
    <button class="ce-button">{{ name }}</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CeButton',
  componentName: 'CeButton',
  props: {
    name: {
      type: String,
      default: '确认',
    },
  },
  setup() {
    return {
      abc: 'abc',
    };
  },
});
</script>
