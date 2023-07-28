<template>
  <RouterView v-if="appIsReady" />
  <div v-else class="app__preloader">
    <WPreloader height="44px" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount } from 'vue'
import { useEventListener } from '@vueuse/core'
import { useAuthStore } from '@/stores/auth/store'
import { useProfileStore } from '@/stores/profile/store'
import { init as firebaseInit } from '@/helpers/plugins/firebase'

import WPreloader from '@/components/shared/w-preloader/WPreloader.vue'

const authStore = useAuthStore()
const profileStore = useProfileStore()

const appIsReady = ref(false)

const isAuthed = computed(() => authStore?.isAuthed)
const emailVerified = computed(() => profileStore?.emailVerified)

useEventListener(window, 'focus', () => {
  if (isAuthed.value && !emailVerified.value) {
    profileStore?.getProfileAction()
  }
})

onBeforeMount(() => {
  firebaseInit(() => {
    appIsReady.value = true
  })
})
</script>

<style scoped lang="scss">
.app {
  &__preloader {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    width: 100%;
  }
}
</style>
