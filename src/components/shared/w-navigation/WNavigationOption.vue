<template>
  <RouterLink
    class="w-navigation-option"
    :class="optionIsActive && '_active'"
    :to="{ name: props.option.name }"
  >
    <Component
      class="w-navigation-option__icon"
      :is="navigationIconComponent"
    />
    <span class="w-navigation-option__label">
      {{ props.option.label }}
    </span>
  </RouterLink>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import { Names } from '@/helpers/enum/router'
import { Option } from '@/helpers/types/w-navigation'

type PropTypes = {
  option: Option
}

const props = defineProps<PropTypes>()

const route = useRoute()

const optionIsActive = computed(() => route?.matched.some(({ name }) => name === props.option.name))

const navigationIconComponent = computed(() => {
  switch (props.option.name) {
    case Names.AUTH_LOGIN:
      return defineAsyncComponent(() => import('@/icons/navigation/login.svg'))
    case Names.AUTH_REGISTER:
      return defineAsyncComponent(() => import('@/icons/navigation/register.svg'))
    case Names.AUTH_FORGOT:
      return defineAsyncComponent(() => import('@/icons/navigation/forgot.svg'))
    case Names.ROUTES:
      return defineAsyncComponent(() => import('@/icons/navigation/routes.svg'))
    case Names.PLACES:
      return defineAsyncComponent(() => import('@/icons/navigation/places.svg'))
    case Names.VIEWER:
      return defineAsyncComponent(() => import('@/icons/navigation/viewer.svg'))
    case Names.AUTH_LOGOUT:
      return defineAsyncComponent(() => import('@/icons/navigation/logout.svg'))
    default:
      return null
  }
})
</script>

<style scoped lang="scss">
.w-navigation-option {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  border-radius: 8px;
  width: 100%;
  padding: 16px;
  color: #59697e;
  background-color: rgba(#ffffff, 0.6);
  transition: background-color 0.15s $easing;
  box-shadow: 0 0 10px -5px #000000;
  cursor: pointer;

  &:hover {
    background-color: rgba(#ffffff, 0.9);
  }

  &._active {
    background-color: rgba(#ffffff, 1);
    color: #000000;
  }

  &__icon {
    display: block;
    height: 22px;
    transition: color 0.15s $easing;
  }

  &__label {
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;
    margin-left: 8px;
    transition: color 0.15s $easing;
    text-transform: uppercase;
  }
}
</style>
