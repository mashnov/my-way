<template>
  <div class="w-sub-navigation">
    <WSubNavigationOption
      v-for="(option, index) in options"
      :key="index"
      :option="option"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Option } from '@/helpers/types/w-sub-navigation'

import WSubNavigationOption from './WSubNavigationOption.vue'

type PropTypes = {
  options: Option[],
}

const props = defineProps<PropTypes>()

const optionCount = computed(() => props.options.length)
</script>

<style lang="scss" scoped>
.w-sub-navigation {
  display: grid;
  grid-template-columns: repeat(v-bind(optionCount), 1fr);
  gap: 33px;
}
</style>
