<template>
  <div class="routes-list">
    <WTransition appear>
      <div
        v-if="isPending"
        class="routes-list__preloader"
      >
        <WPreloader />
      </div>
      <div
        v-else
        class="routes-list__options"
      >
        <RoutesItem
          v-for="(route, index) in sortedRoutesList"
          :key="index"
          :route="route"
        />
      </div>
    </WTransition>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount } from 'vue'
import { usePlacesStore } from '@/stores/places/store'
import { useRoutesStore } from '@/stores/routes/store'
import { useProfileStore } from '@/stores/profile/store'
import { sortByDate } from '@/helpers/functions/date'

import WTransition from '@/components/shared/w-transition/WTransition.vue'
import WPreloader from '@/components/shared/w-preloader/WPreloader.vue'
import RoutesItem from './RoutesItem.vue'

const profileStore = useProfileStore()
const placesStore = usePlacesStore()
const routesStore = useRoutesStore()

const userId = computed(() => profileStore.userId)

const placesPending = computed(() => placesStore.placesPending)
const routesPending = computed(() => routesStore.routesPending)
const isPending = placesPending.value || routesPending.value

const routesList = computed(() => routesStore.routesList)
const sortedRoutesList = computed(() => sortByDate(routesList.value, 'date'))

onBeforeMount(() => {
  placesStore.getPlacesAction(userId.value)
  routesStore.getRoutesAction(userId.value)
})
</script>

<style scoped lang="scss">
.routes-list {
  &__preloader {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    min-height: 200px;
  }
  &__options {
    gap: 33px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
