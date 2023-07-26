<template>
  <WButton
    large
    :theme="Themes.ORANGE"
    :is-pending="logoutPending"
    :is-disabled="authIsPending"
    @click="submitClickHandler"
  >
    Logout
  </WButton>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth/store'
import { useProfileStore } from '@/stores/profile/store'
import { Themes } from '@/helpers/enum/w-button'
import { Names } from '@/helpers/enum/router'

import WButton from '@/components/shared/w-button/WButton.vue'

const router = useRouter()
const authStore = useAuthStore()
const profileStore = useProfileStore()

const authIsPending = computed(() => authStore?.authIsPending)
const logoutPending = computed(() => authStore?.logoutPending)

const submitClickHandler = async () => {
  if (logoutPending.value) {
    return
  }
  const authResponse = await authStore.logoutAction()
  if (!authResponse.success) {
    return
  }
  const profileResponse = profileStore.logoutAction()
  if (!profileResponse.success) {
    return
  }
  await router.push({ name: Names.AUTH_LOGIN })
}

onMounted(() => {
  submitClickHandler()
})
</script>
