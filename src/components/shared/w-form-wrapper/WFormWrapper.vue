<template>
  <div class="w-form-wrapper" :class="props.small && '_small'">
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  small?: boolean
}>()
</script>

<style scoped lang="scss">
.w-form-wrapper {
  max-width: 600px;
  margin: 0 auto;

  &._small {
    max-width: 300px;
  }
}
</style>
