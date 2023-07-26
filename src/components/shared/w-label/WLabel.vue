<template>
  <span
    class="w-label"
    :class="noWrap && '_no-wrap'"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
type PropTypes = {
  noWrap?: boolean
}

const props = defineProps<PropTypes>()
</script>

<style scoped lang="scss">
.w-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  color: #59697e;
  text-transform: uppercase;
  &._no-wrap {
    user-select: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
