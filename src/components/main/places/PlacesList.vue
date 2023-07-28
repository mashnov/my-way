<template>
  <div class="places-list">
    <WTransition appear>
      <div
        v-if="placesPending"
        class="places-list__preloader"
      >
        <WPreloader />
      </div>
      <div
        v-else
        class="places-list__options"
      >
        <PlacesItem
          v-for="(place, index) in sortedPlacesList"
          :key="index"
          :place="place"
        />
      </div>
    </WTransition>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount } from 'vue'
import { usePlacesStore } from '@/stores/places/store'
import { useProfileStore } from '@/stores/profile/store'
import { sortByDate } from '@/helpers/functions/date'

import WTransition from '@/components/shared/w-transition/WTransition.vue'
import WPreloader from '@/components/shared/w-preloader/WPreloader.vue'
import PlacesItem from './PlacesItem.vue'

const placesStore = usePlacesStore()
const profileStore = useProfileStore()

const userId = computed(() => profileStore.userId)

const placesPending = computed(() => placesStore.placesPending)
const placesList = computed(() => placesStore.placesList)
const sortedPlacesList = computed(() => sortByDate(placesList.value, 'date'))

onBeforeMount(() => {
  placesStore.getPlacesAction(userId.value)
})
</script>

<style scoped lang="scss">
.places-list {
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
