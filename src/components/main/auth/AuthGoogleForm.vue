<template>
  <WButton
    large
    :theme="Themes.ORANGE"
    :is-pending="googlePending"
    :is-disabled="authIsPending"
    @click="submitClickHandler"
  >
    <GoogleLogo class="auth-google-form__logo" />
    Google
  </WButton>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth/store'
import { useProfileStore } from '@/stores/profile/store'
import { Themes } from '@/helpers/enum/w-button'
import { Names } from '@/helpers/enum/router'

import GoogleLogo from '@/icons/login/google.svg'
import WButton from '@/components/shared/w-button/WButton.vue'

const router = useRouter()
const authStore = useAuthStore()
const profileStore = useProfileStore()

const authIsPending = computed(() => authStore.authIsPending)
const googlePending = computed(() => authStore.googlePending)

const submitClickHandler = async () => {
  if (authIsPending.value) {
    return
  }
  const authResponse = await authStore.googleAction()
  if (!authResponse.success) {
    return
  }
  const profileResponse = await profileStore.getProfileAction()
  if (!profileResponse.success) {
    return
  }
  await router.push({ name: Names.ROUTES })
}
</script>

<style scoped lang="scss">
.auth-google-form {
  &__logo {
    width: 20px;
    margin-right: 8px;
  }
}
</style>
