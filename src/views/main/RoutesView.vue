<template>
  <div class="profile-view">
    <template v-if="isNavigation">
      <WSubNavigation :options="navigation" />
      <WRouterView />
    </template>
    <template v-else>
      <WDivider :text="routesFormLabel" />
      <WFormWrapper>
        <WTransition appear>
          <Component :is="routesFormComponent" />
        </WTransition>
      </WFormWrapper>
    </template>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, computed } from 'vue'
import { navigation } from '@/helpers/dictionaries/routes-navigation'
import { Names } from '@/helpers/enum/router'

import WDivider from '@/components/shared/w-divider/WDivider.vue'
import WTransition from '@/components/shared/w-transition/WTransition.vue'
import WSubNavigation from '@/components/shared/w-sub-navigation/WSubNavigation.vue'
import WRouterView from '@/components/shared/w-router-view/WRouterView.vue'
import WFormWrapper from '@/components/shared/w-form-wrapper/WFormWrapper.vue'

const props = defineProps<{
  name: Names
}>()

const isNavigation = computed(() => Names.ROUTES === props.name)

const routesFormLabel = computed(() => {
  switch (props.name) {
    case Names.ROUTES_LIST:
      return 'Route list'
    case Names.ROUTES_DETAILS:
      return 'Route Details'
    case Names.ROUTES_ADD:
      return 'New route'
    default:
      return ''
  }
})

const routesFormComponent = computed(() => {
  switch (props.name) {
    case Names.ROUTES_LIST:
      return defineAsyncComponent(() => import('@/components/main/routes/RoutesList.vue'))
    case Names.ROUTES_DETAILS:
      return defineAsyncComponent(() => import('@/components/main/routes/RoutesForm.vue'))
    case Names.ROUTES_ADD:
      return defineAsyncComponent(() => import('@/components/main/routes/RoutesForm.vue'))
    default:
      return null
  }
})
</script>
