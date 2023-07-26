<template>
  <WInput
    ref="inputComponent"
    :hide-label="props.hideLabel"
    :type="Types.TEXT"
    :input-mode="Modes.NONE"
    :disable-spellcheck="props.disableSpellcheck"
    :is-disabled="props.isDisabled"
    :value="props.value"
    @input="inputHandler"
    @focus="focusHandler"
    @blur="blurHandler"
    @enter="emit(Events.ENTER)"
    @mouse-enter="isHovered = true"
    @mouse-leave="isHovered = false"
  >
    <template v-if="props.isPending" #after>
      <div class="w-input-text__pending">
        <WPreloader />
      </div>
    </template>
    <template v-else-if="actionIconIsVisible" #after>
      <div
        class="w-input-text__status"
        :class="[isFocused && '_focused', isHovered && '_hovered']"
        @click.prevent="iconClickHandler"
      >
        <ClearIcon class="w-input-text__icon" />
      </div>
    </template>
    <template #label>
      <slot name="label" />
    </template>
  </WInput>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Types, Events, Modes } from '@/helpers/enum/w-input'

import WInput from '@/components/shared/w-input/WInput.vue'
import WPreloader from '@/components/shared/w-preloader/WPreloader.vue'

import ClearIcon from '@/icons/input/input-text.svg'

type PropTypes = {
  value: string
  isPending?: boolean
  isDisabled?: boolean
  disableSpellcheck?: boolean
  hideClearIcon?: boolean
  hideLabel?: boolean
}

const props = defineProps<PropTypes>()

const emit = defineEmits([
  Events.INPUT,
  Events.BLUR,
  Events.FOCUS,
  Events.ENTER,
  Events.SET_IS_VALID
])

const inputComponent = ref()
const isHovered = ref(false)
const isFocused = ref(false)

const inputIsEmpty = computed(() => !props.value.length)
const actionIconIsVisible = computed(() => !props.hideClearIcon && !inputIsEmpty.value)

const iconClickHandler = () => {
  inputHandler('')
  inputComponent.value.setFocus()
}
const inputHandler = (value: string) => {
  emit(Events.INPUT, value)
}
const focusHandler = () => {
  isFocused.value = true
  emit(Events.FOCUS)
}
const blurHandler = () => {
  isFocused.value = false
  emit(Events.BLUR)
}
</script>

<style scoped lang="scss">
.w-input-text {
  &__pending {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
  }
  &__status {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 10px;
    color: #d1d9e3;
    transition: background-color 0.15s $easing;
    cursor: pointer;
    &._hovered {
      border-color: #91c4ff;
      color: #91c4ff;
    }
    &._focused {
      color: #0076ff;
      &:hover {
        background-color: #e9eef4;
        color: #59697e;
      }
    }
    &:not(._focused):not(._active) {
      &:hover {
        color: #0076ff;
      }
    }
  }
  &__icon {
    display: block;
    height: 11px;
    color: inherit;
    transition: color 0.15s $easing;
  }
}
</style>
