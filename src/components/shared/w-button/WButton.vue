<template>
  <div
    class="w-button"
    :class="[
      props.large && '_large',
      props.isPending && '_loading',
      props.isDisabled && '_disabled',
      props.theme && `_theme-${props.theme}`,
    ]"
    @click="buttonClickHandler"
  >
    <button :disabled="props.isDisabled || props.isPending" class="w-button__button" type="button">
      <span>
        <WPreloader v-if="props.isPending" height="24px" color="#59697e" />
        <slot v-else />
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { Events } from '@/helpers/enum/w-button'
import { Themes } from '@/helpers/enum/w-button'

import WPreloader from '@/components/shared/w-preloader/WPreloader.vue'

type PropTypes = {
  theme: Themes
  large?: boolean
  isPending?: boolean
  isDisabled?: boolean
}

const props = defineProps<PropTypes>()

const emit = defineEmits([Events.CLICK, Events.DISABLED_CLICK])

const buttonClickHandler = () => {
  emit(props.isDisabled ? Events.DISABLED_CLICK : Events.CLICK)
}
</script>

<style lang="scss" scoped>
.w-button {
  --opacity: 1;
  --block-background: #ffffff;
  --span-background: rgba(255,255,255, 0.9);
  --color: #000000;
  --transform: scale(1);
  --cursor: pointer;

  &._theme {
    &-red {
      --block-background: linear-gradient(36deg, #ff4e6e, #fe5151);
    }
    &-red-reverse {
      --block-background: linear-gradient(36deg, #fe5151, #ff4e6e);
    }
    &-blue {
      --block-background: linear-gradient(36deg, #495aff, #0acffe);
    }
    &-blue-reverse {
      --block-background: linear-gradient(36deg, #0acffe, #495aff);
    }
    &-green {
      --block-background: linear-gradient(36deg, #9be15d, #00e3ae);
    }
    &-green-reverse {
      --block-background: linear-gradient(36deg, #00e3ae, #9be15d);
    }
    &-orange {
      --block-background: linear-gradient(36deg, #f9d423, #f79b62);
    }
    &-orange-reverse {
      --block-background: linear-gradient(36deg, #f79b62, #f9d423);
    }
  }
  &._disabled {
    --opacity: 0.6;
    --cursor: not-allowed;
  }
  &:not(._disabled) {
    &:hover > .w-button__button {
      --transform: scale(0.99);
      --span-background: rgba(255,255,255, 0.95);
    }
    &:active > .w-button__button {
      --transform: scale(0.95);
      --span-background: rgba(255,255,255, 1);
    }
  }
  .w-button {
    &__button {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      transform-origin: center;
      box-shadow: 0 0 12px -8px #000000;
      transition: opacity 0.1s $easing, transform 0.1s $easing;
      width: 100%;
      padding: 15px 15px;
      border-radius: 8px;
      transform: var(--transform);
      background: var(--block-background);
      opacity: var(--opacity);
      cursor: var(--cursor);

      &:before {
        content: '';
        position: absolute;
        background: var(--span-background);
        width: calc(100% - 4px);
        height: calc(100% - 4px);
        border-radius: 6px;
        transition: background 0.1s $easing;
        z-index: 0;
      }

      span {
        display: flex;
        justify-content: center;
        align-items: center;
        white-space: nowrap;
        line-height: 24px;
        font-size: 18px;
        font-weight: 500;
        color: var(--color);
        text-transform: uppercase;
        user-select: none;
        z-index: 1;
      }
    }
  }
}
</style>
