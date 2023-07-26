<template>
  <WInput
    ref="inputComponent"
    disable-spellcheck
    :hide-label="props.hideLabel"
    :is-disabled="props.isDisabled"
    :value="props.value"
    :type="inputType"
    @input="emit(Events.INPUT, $event)"
    @focus="focusHandler"
    @blur="blurHandler"
    @enter="emit(Events.ENTER)"
    @mouse-enter="isHovered = true"
    @mouse-leave="isHovered = false"
  >
    <template v-if="isPending" #after>
      <div class="w-input-password__pending">
        <WPreloader />
      </div>
    </template>
    <template v-else-if="actionIconIsVisible" #after>
      <div
        class="w-input-password__status"
        :class="[
          passwordIsVisible && '_active',
          isFocused && '_focused',
          isHovered && '_hovered',
        ]"
        @click.prevent="iconClickHandler"
      >
        <PasswordIcon class="w-input-password__icon" />
      </div>
    </template>
    <template #label>
      <slot name="label" />
    </template>
  </WInput>
  <div v-if="showHint" class="w-input-password__hint">
    <WInputPasswordHint
      :number="passwordStatus.number"
      :special="passwordStatus.special"
      :upper="passwordStatus.upper"
      :count="passwordStatus.count"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { passwordValidator } from '@/helpers/functions/string'
import { Types, Events } from '@/helpers/enum/w-input'

import WInputPasswordHint from './WInputPasswordHint.vue'
import WInput from '@/components/shared/w-input/WInput.vue'
import WPreloader from '@/components/shared/w-preloader/WPreloader.vue'

import PasswordIcon from '@/icons/input/input-password.svg'

type PropTypes = {
  value: string
  isDisabled?: boolean
  isPending?: boolean
  hideLabel?: boolean
  showHint?: boolean
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
const passwordIsVisible = ref(false)
const isHovered = ref(false)
const isFocused = ref(false)

const inputType = computed(() => passwordIsVisible.value ? Types.TEXT : Types.PASSWORD)
const passwordIsEmpty = computed(() => !props.value.length)
const actionIconIsVisible = computed(() => !passwordIsEmpty.value && !props.isDisabled)
const passwordStatus = computed(() => passwordValidator(props.value))
const passwordIsCorrect = computed(() => {
  const { number, special, upper, count } = passwordStatus.value
  return number && special && upper && count
})

const iconClickHandler = () => {
  passwordIsVisible.value = !passwordIsVisible.value
  inputComponent.value.setFocus()
}
const focusHandler = () => {
  isFocused.value = true
  emit(Events.FOCUS)
}
const blurHandler = () => {
  isFocused.value = false
  emit(Events.BLUR)
}

watch(() => passwordIsCorrect.value, value => {
  emit(Events.SET_IS_VALID, value)
},{ immediate: true })
</script>

<style scoped lang="scss">
.w-input-password {
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
    &._active {
      background-color: #e9eef4;
      color: #59697e;
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
    height: 22px;
    color: inherit;
    transition: color 0.15s $easing;
  }
  &__hint {
    margin-top: 4px;
    margin-bottom: calc(-4px - 3px);
  }
}
</style>
