<template>
  <div class="auth-login-form">
    <div class="auth-login-form__option">
      <WInputEmail
        :value="username"
        :is-pending="loginPending"
        :is-disabled="authIsPending"
        @input="username = $event"
        @set-is-valid="usernameIsValid = $event"
        @enter="submitClickHandler"
      >
        <template #label> email </template>
      </WInputEmail>
    </div>
    <div class="auth-login-form__option">
      <WInputPassword
        :value="password"
        :is-pending="loginPending"
        :is-disabled="authIsPending"
        @input="password = $event"
        @set-is-valid="passwordIsValid = $event"
        @enter="submitClickHandler"
      >
        <template #label> password </template>
      </WInputPassword>
    </div>
    <div class="auth-login-form__option _submit">
      <WButton
        large
        :theme="Themes.BLUE"
        :is-pending="loginPending"
        :is-disabled="submitIsDisabled"
        @click="submitClickHandler"
      >
        Log In
      </WButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth/store'
import { useProfileStore } from '@/stores/profile/store'
import { Themes } from '@/helpers/enum/w-button'
import { Names } from '@/helpers/enum/router'

import WInputEmail from '@/components/shared/w-input-email/WInputEmail.vue'
import WInputPassword from '@/components/shared/w-input-password/WInputPassword.vue'
import WButton from '@/components/shared/w-button/WButton.vue'

const router = useRouter()
const authStore = useAuthStore()
const profileStore = useProfileStore()

const username = ref('')
const password = ref('')
const usernameIsValid = ref(false)
const passwordIsValid = ref(false)

const authIsPending = computed(() => authStore?.authIsPending)
const loginPending = computed(() => authStore?.loginPending)
const submitIsDisabled = computed(() => !usernameIsValid.value || !passwordIsValid.value || authIsPending.value)

const submitClickHandler = async () => {
  if (submitIsDisabled.value) {
    return
  }
  const authFormData = { username: username.value, password: password.value }
  const authResponse = await authStore.loginAction(authFormData)
  if (!authResponse.success) {
    // todo: notification
    console.log(authResponse)
    return
  }
  const profileResponse = await profileStore.getProfileAction()
  if (!profileResponse.success) {
    // todo: notification
    console.log(profileResponse)
    return
  }
  await router.push({ name: Names.ROUTES })
}
</script>

<style scoped lang="scss">
.auth-login-form {
  &__option {
    margin-bottom: 33px;

    &._submit {
      margin-top: 66px;
    }
  }
}
</style>
