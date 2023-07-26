<template>
  <label class="w-input__wrapper">
    <WLabel
      no-wrap
      class="w-input__label"
      :class="[labelIsOnTop && '_top', props.isDisabled && '_disabled']"
      v-if="!hideLabel"
    >
      <slot name="label" />
    </WLabel>
    <span
      class="w-input"
      :class="[
        isFocused && '_focused',
        props.isDisabled && '_disabled',
      ]"
      @mouseenter="emit(Events.MOUSE_ENTER)"
      @mouseleave="emit(Events.MOUSE_LEAVE)"
    >
      <slot name="before" />
      <input
        class="w-input__field"
        ref="inputHtmlElement"
        :type="inputType"
        :inputmode="props.inputMode"
        :spellcheck="!props.disableSpellcheck"
        :disabled="props.isDisabled"
        :value="props.value"
        @input="inputHandler"
        @focus="focusHandler"
        @blur="blurHandler"
        @keypress="emit(Events.KEYPRESS)"
        @keypress.enter="emit(Events.ENTER)"
      />
      <slot name="after" />
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Events, Modes, Types } from '@/helpers/enum/w-input'

import WLabel from '@/components/shared/w-label/WLabel.vue'

type PropsTypes = {
  value: string
  type: Types
  inputMode?: Modes
  isDisabled?: boolean
  disableSpellcheck?: boolean
  hideLabel?: boolean
}

const props = withDefaults(defineProps<PropsTypes>(), {
  inputMode: Modes.NONE,
})

const emit = defineEmits([
  Events.INPUT,
  Events.BLUR,
  Events.FOCUS,
  Events.ENTER,
  Events.MOUSE_ENTER,
  Events.MOUSE_LEAVE,
  Events.KEYPRESS,
])

const inputHtmlElement = ref()
const inputType = ref<Types>(props.type)
const isFocused = ref(false)

const labelIsOnTop = computed(() => isFocused.value || !!props.value)
const setFocus = () => {
  if (!inputHtmlElement.value) {
    return
  }
  if (!isFocused.value) {
    inputHtmlElement.value.focus()
  }
}
const setInputType = (value: Types) => {
  inputType.value = value
}
const inputHandler = (event: Event) => {
  if (event.target instanceof HTMLInputElement) {
    emit(Events.INPUT, event?.target.value)
  }
}
const focusHandler = () => {
  emit(Events.FOCUS)
  isFocused.value = true
}
const blurHandler = () => {
  emit(Events.BLUR)
  isFocused.value = false
}

watch(() => props.type, value => {
  setInputType(value)
},{ immediate: true })

defineExpose({ setFocus })
</script>

<style scoped lang="scss">
.w-input {
  display: flex;
  align-items: center;
  padding: 8px 22px;
  border-radius: 8px;
  border: solid 1px #d1d9e3;
  background-color: #ffffff;
  box-shadow: 0 0 12px -8px #000000;
  cursor: text;
  &._focused {
    border: solid 1px #0076ff;
  }
  &._disabled {
    background-color: #f4f6f9;
    border: solid 1px #d1d9e3;
    cursor: not-allowed;
  }
  &:not(._disabled):not(._focused) {
    &:hover {
      border: solid 1px #91c4ff;
    }
  }
  &__wrapper {
    position: relative;
  }
  &__field {
    flex-grow: 1;
    border: none;
    line-height: 38px;
    font-size: 18px;
    font-weight: 500;
    padding: 0;
    width: 100%;
    background: transparent;
    cursor: inherit;
  }
  &__label {
    position: absolute;
    background: #ffffff;
    max-width: calc(100% - 40px);
    padding: 2px 5px;
    pointer-events: none;
    display: block;
    border-radius: 4px;
    border: 1px solid transparent;
    transition: transform 0.15s $easing;
    transform: translate(10px, -12px);
    z-index: 1;
    &:not(._top) {
      transform: translate(20px, 17px);
    }
    &._disabled {
      background: #f4f6f9;
      &._top {
        border-color: #d1d9e3;
      }
    }
  }
}
</style>
