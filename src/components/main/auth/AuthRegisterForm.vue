<template>
  <div class="auth-register-form">
    <div class="auth-register-form__option">
      <WInputEmail
        :value="username"
        :is-pending="registerPending"
        :is-disabled="authIsPending"
        @input="username = $event"
        @set-is-valid="usernameIsValid = $event"
        @enter="submitClickHandler"
      >
        <template #label> email </template>
      </WInputEmail>
    </div>
    <div class="auth-register-form__option">
      <WInputPassword
        show-hint
        :value="password"
        :is-pending="registerPending"
        :is-disabled="authIsPending"
        @input="password = $event"
        @set-is-valid="passwordIsValid = $event"
        @enter="submitClickHandler"
      >
        <template #label> password </template>
      </WInputPassword>
    </div>
    <div class="auth-register-form__option">
      <WInputPassword
        :value="password2"
        :is-pending="registerPending"
        :is-disabled="authIsPending"
        @input="password2 = $event"
        @enter="submitClickHandler"
      >
        <template #label> retype password </template>
      </WInputPassword>
    </div>
    <div class="auth-register-form__option _submit">
      <WButton
        large
        :theme="Themes.GREEN"
        :is-pending="registerPending"
        :is-disabled="submitIsDisabled"
        @click="submitClickHandler"
      >
        Register
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
const password2 = ref('')
const usernameIsValid = ref(false)
const passwordIsValid = ref(false)

const authIsPending = computed(() => authStore?.authIsPending)
const registerPending = computed(() => authStore?.registerPending)
const passwordIsMatch = computed(() => !!password.value.length && password.value === password2.value)
const submitIsDisabled = computed(() => !usernameIsValid.value || !passwordIsMatch.value || !passwordIsValid.value || authIsPending.value)

const submitClickHandler = async () => {
  if (submitIsDisabled.value) {
    return
  }
  const authFormData = { username: username.value, password: password.value }
  const authResponse = await authStore.registerAction(authFormData)
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
  await router.push({ name: Names.PROFILE })
}
</script>

<style scoped lang="scss">
.auth-register-form {
  &__option {
    margin-bottom: 33px;

    &._submit {
      margin-top: 66px;
    }
  }
}
</style>
