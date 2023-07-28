<template>
  <WInput
    ref="inputComponent"
    disable-spellcheck
    :hide-label="props.hideLabel"
    :is-disabled="props.isDisabled"
    :value="props.value"
    :type="Types.EMAIL"
    :input-mode="Modes.EMAIL"
    @input="emit(Events.INPUT, $event)"
    @focus="focusHandler"
    @blur="blurHandler"
    @enter="emit(Events.ENTER)"
    @mouse-enter="isHovered = true"
    @mouse-leave="isHovered = false"
  >
    <template v-if="isPending" #after>
      <div class="w-input-email__pending">
        <WPreloader />
      </div>
    </template>
    <template v-else #after>
      <div
        class="w-input-email__status"
        @click.prevent="iconClickHandler"
      >
        <EmailIcon
          class="w-input-email__icon"
          :class="[
            props.isDisabled && '_disabled',
            emailIsIncorrect && '_incorrect',
            emailIsCorrect && '_correct',
            isFocused && '_focused',
            isHovered && '_hovered',
          ]"
        />
      </div>
    </template>
    <template #label>
      <slot name="label" />
    </template>
  </WInput>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { emailValidator } from '@/helpers/functions/string'
import { Types, Modes, Events } from '@/helpers/enum/w-input'

import WInput from '@/components/shared/w-input/WInput.vue'
import WPreloader from '@/components/shared/w-preloader/WPreloader.vue'

import EmailIcon from '@/icons/input/input-email.svg'

type PropTypes = {
  value: string
  isDisabled?: boolean
  isPending?: boolean
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

const emailStatus = computed(() => emailValidator(props.value))
const emailIsCorrect = computed(() => emailStatus.value.email && emailStatus.value.count)
const emailIsIncorrect = computed(() => !!props.value.length && !emailIsCorrect.value)

const iconClickHandler = () => {
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

watch(() => emailIsCorrect.value, value => {
  emit(Events.SET_IS_VALID, value)
},{ immediate: true })
</script>

<style scoped lang="scss">
.w-input-email {
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
  }
  &__icon {
    display: block;
    height: 20px;
    color: #d1d9e3;
    transition: color 0.1s $easing;
    cursor: pointer;
    &:not(._disabled):not(._focused) {
      &._correct {
        color: #19dd7f;
      }
    }
    &:not(._disabled):not(._focused) {
      &._incorrect {
        color: #f94141;
      }
    }
    &:not(._disabled):not(._incorrect):not(._correct):not(._focused) {
      &._hovered {
        color: #91c4ff;
      }
    }
    &._focused {
      color: #0076ff;
    }
    &._disabled {
      cursor: not-allowed;
    }
  }
}
</style>
