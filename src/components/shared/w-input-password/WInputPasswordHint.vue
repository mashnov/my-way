<template>
  <div class="w-input-password-hint">
    <div class="w-input-password-hint__option" :class="passwordCorrectRulesCount > 0 && '_orange'" />
    <div class="w-input-password-hint__option" :class="passwordCorrectRulesCount > 1 && '_orange'" />
    <div class="w-input-password-hint__option" :class="passwordCorrectRulesCount > 2 && '_orange'" />
    <div class="w-input-password-hint__option" :class="passwordCorrectRulesCount > 3 && '_green'" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type PropTypes = {
  number: boolean
  special: boolean
  upper: boolean
  count: boolean
}

const props = defineProps<PropTypes>()

const passwordCorrectRulesCount = computed(() => {
  const { number, special, upper, count } = props
  return [number, special, upper, count].filter(option => option).length
})
</script>

<style scoped lang="scss">
.w-input-password-hint {
  gap: 3px;
  display: flex;
  flex-wrap: wrap;
  margin-left: 15px;
  width: calc(100% - 15px - 15px);
  &__option {
    flex-grow: 1;
    height: 3px;
    border-radius: 2px;
    &._orange {
      background: #ffbb88;
    }
    &._green {
      background: #88dbbb;
    }
  }
}
</style>
