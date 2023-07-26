<template>
  <div class="w-tooltip">
    <WTransition :name="Animations.FADE">
      <div v-if="isVisible" class="w-tooltip__hint" :class="position && `_${position}`">
        {{ text }}
      </div>
    </WTransition>
    <div class="w-tooltip__content" @mouseover="isVisible = true" @mouseleave="isVisible = false">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Animations } from '@/helpers/enum/w-transition'
import { Position } from '@/helpers/enum/w-tooltip'
import WTransition from '@/components/shared/w-transition/WTransition.vue'

type PropsTypes = {
  position?: Position
  text?: string | null
}

const props = withDefaults(defineProps<PropsTypes>(), {
  position: Position.TOP,
  text: null,
})

const isVisible = ref(false)
</script>

<style lang="scss" scoped>
.w-tooltip {
  &__hint {
    position: absolute;
    width: max-content;
    background-color: rgba(#ffffff, 0.5);
    box-shadow: 0 0 10px -5px #000000;
    backdrop-filter: blur(12px);
    border-radius: 8px;
    padding: 8px;
    font-size: 12px;
    line-height: 24px;
    color: #2c3a4e;
    font-weight: 500;
    text-transform: uppercase;
    margin-left: 30px;

    &._top {
      margin-top: -30px;
    }
    &._bottom {
      margin-top: 30px;
    }
  }
}
</style>
