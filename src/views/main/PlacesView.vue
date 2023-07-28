<template>
  <div class="profile-view">
    <template v-if="isNavigation">
      <WSubNavigation :options="navigation" />
      <WRouterView />
    </template>
    <template v-else>
      <WDivider :text="routesFormLabel" />
      <WTransition appear>
        <Component :is="routesFormComponent" />
      </WTransition>
    </template>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, computed } from 'vue'
import { navigation } from '@/helpers/dictionaries/places-navigation'
import { Names } from '@/helpers/enum/router'

import WDivider from '@/components/shared/w-divider/WDivider.vue'
import WTransition from '@/components/shared/w-transition/WTransition.vue'
import WSubNavigation from '@/components/shared/w-sub-navigation/WSubNavigation.vue'
import WRouterView from '@/components/shared/w-router-view/WRouterView.vue'

const props = defineProps<{
  name: Names
}>()

const isNavigation = computed(() => Names.PLACES === props.name)

const routesFormLabel = computed(() => {
  switch (props.name) {
    case Names.PLACES_LIST:
      return 'Place list'
    case Names.PLACES_DETAILS:
      return 'Place Details'
    case Names.PLACES_ADD:
      return 'New Place'
    default:
      return ''
  }
})

const routesFormComponent = computed(() => {
  switch (props.name) {
    case Names.PLACES_LIST:
      return defineAsyncComponent(() => import('@/components/main/places/PlacesList.vue'))
    case Names.PLACES_DETAILS:
      return defineAsyncComponent(() => import('@/components/main/places/PlacesForm.vue'))
    case Names.PLACES_ADD:
      return defineAsyncComponent(() => import('@/components/main/places/PlacesForm.vue'))
    default:
      return null
  }
})
</script>
