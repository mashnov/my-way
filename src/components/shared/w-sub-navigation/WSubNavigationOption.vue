<template>
  <div
    class="w-sub-navigation-option"
    :class="[
      optionIsActive && '_active',
      props.option.theme && `_theme-${props.option.theme}`,
    ]"
  >
    <RouterLink
      :to="{ name: props.option.name }"
      class="w-sub-navigation-option__button"
    >
      <span>
        {{ props.option.label }}
      </span>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Option } from '@/helpers/types/w-sub-navigation'

type PropTypes = {
  option: Option
}

const props = defineProps<PropTypes>()

const route = useRoute()

const optionIsActive = computed(() => route?.matched.some(({ name }) => name === props.option.name))
</script>

<style lang="scss" scoped>
.w-sub-navigation-option {
  --block-background: #ffffff;
  --span-background: rgba(255,255,255, 0.8);

  &:hover {
  --span-background: rgba(255,255,255, 0.6);
  }

  &._active {
  --span-background: rgba(255,255,255, 1);
  }

  &._theme {
    &-red {
      --block-background: linear-gradient(24deg, #A445B2, #FF0066);
    }
    &-orange {
      --block-background: linear-gradient(24deg, #f9d423, #ff4e50);
    }
    &-green {
      --block-background: linear-gradient(24deg, #9be15d, #00e3ae);
    }
    &-blue {
      --block-background: linear-gradient(24deg, #495aff, #0acffe);
    }
  }

  &__button {
    background: var(--block-background);
    box-shadow: 0 0 18px -12px #000000;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    padding: 22px;
    border: none;
    width: 100%;
    cursor: pointer;

    &:before {
      content: '';
      position: absolute;
      background: var(--span-background);
      width: calc(100% - 4px);
      height: calc(100% - 4px);
      border-radius: 7px;
      transition: background 0.1s $easing;
      z-index: 0;
    }

    span {
      position: relative;
      font-size: 14px;
      font-weight: 500;
      color: #000000;
      text-transform: uppercase;
      z-index: 1;
    }
  }
}
</style>
