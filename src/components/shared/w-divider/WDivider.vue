<template>
  <div
    class="w-divider"
    :data-text="props.text"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
type PropTypes = {
  text: string
}

const props = defineProps<PropTypes>()
</script>

<style scoped lang="scss">
.w-divider {
  position: relative;
  margin-bottom: 66px;
  padding-bottom: 66px;
  border-bottom: 1px solid #d7e1ee;

  &:before {
    content: attr(data-text);
    position: absolute;
    min-width: 44px;
    height: 44px;
    padding: 0 11px;
    border-radius: 8px;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 50%);
    line-height: 44px;
    font-size: 15px;
    font-weight: 500;
    text-align: center;
    text-transform: uppercase;
    background: #ffffff;
    color: #59697e;
    border: 1px solid #d7e1ee;
    box-shadow: 0 0 12px -8px #000000;
  }
}
</style>
