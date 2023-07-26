<template>
  <div class="routes-list">
    <pre>{{ isPending }}</pre>
    <pre>{{ list }}</pre>
    <pre>{{ placesList }}</pre>
    <pre>{{ routesList }}</pre>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { usePlacesStore } from '@/stores/places/store'
import { useRoutesStore } from '@/stores/routes/store'
import { useProfileStore } from '@/stores/profile/store'

const profileStore = useProfileStore()
const placesStore = usePlacesStore()
const routesStore = useRoutesStore()

const userId = computed(() => profileStore.userId)

const placesPending = computed(() => placesStore?.placesPending)
const routesPending = computed(() => routesStore?.routesPending)
const isPending = placesPending.value || routesPending.value

const placesList = computed(() => placesStore?.placesList)
const routesList = computed(() => routesStore?.routesList)

const list = computed(() => {
  console.log(placesList.value, routesList.value)
  return []
})

onMounted(() => {
  placesStore.getPlacesAction(userId.value)
  routesStore.getRoutesAction(userId.value)
})
</script>

