<template>
  <div class="main-view">
    <div class="main-view__navigation">
      <WNavigation :options="navigationOptions" />
    </div>
    <div class="main-view__content">
      <div class="main-view__wrapper">
        <WRouterView />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth/store'
import { useProfileStore } from '@/stores/profile/store'
import { navigation } from '@/helpers/dictionaries/main-navigation'

import WNavigation from '@/components/shared/w-navigation/WNavigation.vue'
import WRouterView from '@/components/shared/w-router-view/WRouterView.vue'

const authStore = useAuthStore()
const profileStore = useProfileStore()

const isAuthed = computed(() => authStore?.isAuthed)
const navigationOptions = computed(() => navigation.filter(({ authed }) => (authed ? isAuthed.value : !isAuthed.value)))

const authHandler = async () => {
  const authResponse = await authStore.authAction()
  if (!authResponse.success) {
    return
  }
  const profileResponse = await profileStore.getProfileAction()
  if (!profileResponse.success) {
    return
  }
}

onMounted(() => {
  authHandler()
})
</script>

<style scoped lang="scss">
.main-view {
  display: grid;
  grid-template-columns: auto 1fr;
  min-height: 100vh;

  &__navigation {
    position: relative;
    background: linear-gradient(8deg, #02d8dd 10%, #5a8de9 50%, #f901fe 90%) fixed;
    width: 420px;
  }
  &__content {
    position: relative;
    box-shadow: 0 0 10px -5px #000000;
  }
  &__wrapper {
    width: 100%;
    margin: 0 auto;
    padding: 66px 0;
    max-width: calc(100% - 40px);
    transition: max-width 0.15s $easing;

    @media screen and (min-width: 576px) {
      max-width: calc(100% - 80px);
    }
    @media screen and (min-width: 768px) {
      max-width: calc(100% - 120px);
    }
    @media screen and (min-width: 992px) {
      max-width: 960px;
    }
  }
}
</style>
