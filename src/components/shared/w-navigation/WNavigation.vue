<template>
  <div class="main-navigation">
    <WTransitionGroup appear :duration="10" :name="Animations.LIST">
      <div
        class="main-navigation__option"
        :class="`_${option.name}`"
        v-for="(option, index) in props.options"
        :key="index"
      >
        <Component
          :is="getOptionComponent(option.type)"
          :option="option"
        />
      </div>
    </WTransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { Option } from '@/helpers/types/w-navigation'
import { Types } from '@/helpers/enum/w-navigation'
import { Animations } from '@/helpers/enum/w-transition'

import WTransitionGroup from '@/components/shared/w-transition-group/WTransitionGroup.vue'

type PropTypes = {
  options: Option[]
}

const props = defineProps<PropTypes>()

const getOptionComponent = (type: Types) => {
  switch (type) {
    case Types.PROFILE:
      return defineAsyncComponent(() => import('./WNavigationProfile.vue'))
    default:
      return defineAsyncComponent(() => import('./WNavigationOption.vue'))
  }
}
</script>

<style scoped lang="scss">
.main-navigation {
  position: sticky;
  padding: 16px;
  top: 0;

  &__option {
    margin-bottom: 12px;

    &._profile {
      margin-bottom: 33px;
    }
    &._auth-logout {
      margin-top: 33px;
    }
  }
}
</style>
