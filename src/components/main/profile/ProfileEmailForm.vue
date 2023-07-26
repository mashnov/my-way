<template>
  <div class="profile-email-form">
    <div
      v-if="emailProvider"
      class="profile-email-form__option"
    >
      <WInputPassword
        :value="password"
        :is-pending="profileIsPending"
        :is-disabled="profileIsPending"
        @input="password = $event"
        @set-is-valid="passwordIsValid = $event"
      >
        <template #label> password </template>
      </WInputPassword>
    </div>
    <div class="profile-email-form__option">
      <WInputEmail
        :value="email"
        :is-pending="updateEmailPending"
        :is-disabled="updateEmailPending || !passwordIsEntered"
        @input="email = $event"
        @set-is-valid="emailIsValid = $event"
        @enter="changeClickHandler"
      >
        <template #label> new email </template>
      </WInputEmail>
    </div>
    <div class="profile-email-form__option _action" :class="confirmEmailIsVisible && '_double'">
      <WButton
        large
        :theme="Themes.GREEN"
        :is-pending="updateEmailPending"
        :is-disabled="changeIsDisabled"
        @click="changeClickHandler"
      >
        change email
      </WButton>
      <WButton
        large
        v-if="confirmEmailIsVisible"
        :theme="Themes.GREEN_REVERSE"
        :is-pending="confirmEmailPending"
        :is-disabled="confirmIsDisabled"
        @click="confirmClickHandler"
      >
        confirm email
      </WButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { useAuthStore } from '@/stores/auth/store'
import { useProfileStore } from '@/stores/profile/store'
import { Themes } from '@/helpers/enum/w-button'

import WInputPassword from '@/components/shared/w-input-password/WInputPassword.vue'
import WInputEmail from '@/components/shared/w-input-email/WInputEmail.vue'
import WButton from '@/components/shared/w-button/WButton.vue'

const authStore = useAuthStore()
const profileStore = useProfileStore()

const password = ref('')
const email = ref('')
const passwordIsValid = ref(false)
const emailIsValid = ref(false)

const emailProvider = computed(() => authStore?.emailProvider)
const profileIsPending = computed(() => profileStore?.profileIsPending)
const updateEmailPending = computed(() => profileStore?.updateEmailPending)
const confirmEmailPending = computed(() => profileStore?.confirmEmailPending)
const userEmailValue = computed(() => profileStore?.userEmail)
const emailVerified = computed(() => profileStore?.emailVerified)
const emailIsSend = computed(() => profileStore?.emailIsSend)
const confirmEmailIsVisible = computed(() => !emailVerified.value && !emailIsSend.value)
const passwordIsEntered = computed(() => !emailProvider.value || passwordIsValid.value)
const changeIsDisabled = computed(() => profileIsPending.value || !passwordIsEntered.value || !emailIsValid.value)
const confirmIsDisabled = computed(() => profileIsPending.value || !confirmEmailIsVisible.value)

const changeClickHandler = async () => {
  if (changeIsDisabled.value) {
    return
  }
  const authFormData = { password: password.value }
  const authResponse = await authStore.reAuthAction(authFormData)
  if (!authResponse.success) {
    return
  }
  const profileFormData = { email: email.value }
  const profileResponse = await profileStore.updateEmailAction(profileFormData)
  if (!profileResponse.success) {
    return
  }
  const updateResponse = await profileStore.getProfileAction()
  if (!updateResponse.success) {
    return
  }
  // todo: notification
}

const confirmClickHandler = async () => {
  if (confirmIsDisabled.value) {
    return
  }
  const profileResponse = await profileStore.confirmEmailAction()
  if (!profileResponse.success) {
    return
  }
  const updateResponse = await profileStore.getProfileAction()
  if (!updateResponse.success) {
    return
  }
  // todo: notification
}

onMounted(() => {
  email.value = userEmailValue.value || ''
})
</script>


<style scoped lang="scss">
.profile-email-form {
  &__option {
    margin-bottom: 33px;

    &._action {
      margin-top: 66px;
    }
    &._double {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }
  }
}
</style>
