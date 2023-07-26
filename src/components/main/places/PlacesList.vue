<template>
  <div class="places-list">
    <pre>{{ placesPending }}</pre>
    <pre>{{ placesList }}</pre>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { usePlacesStore } from '@/stores/places/store'
import { useProfileStore } from '@/stores/profile/store'

const placesStore = usePlacesStore()
const profileStore = useProfileStore()

const placesPending = computed(() => placesStore?.placesPending)
const placesList = computed(() => placesStore?.placesList)

const userId = computed(() => profileStore.userId)

onMounted(() => {
  placesStore.getPlacesAction(userId.value)
})
</script>

