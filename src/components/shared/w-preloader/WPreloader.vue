<template>
  <div class="w-loader">
    <PreloaderIcon />
  </div>
</template>

<script setup lang="ts">
import PreloaderIcon from '@/icons/app/preloader.svg'

type PropTypes = {
  height?: string
  color?: string
}

const props = withDefaults(defineProps<PropTypes>(), {
  height: '20px',
  color: '#979ea8'
})
</script>

<style scoped lang="scss">
.w-loader {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  height: v-bind(height);

  & svg {
    display: block;
    height: 100%;
    color: v-bind(color);
  }
}
</style>
