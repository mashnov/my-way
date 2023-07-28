<template>
  <div class="profile-account-form">
    <div
      v-if="emailProvider"
      class="profile-account-form__option"
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
    <div class="profile-account-form__option">
      <WInputText
        disable-spellcheck
        :value="userName"
        :is-pending="updateProfilePending"
        :is-disabled="updateProfilePending || !passwordIsEntered"
        @input="userName = $event"
        @enter="updateProfileHandler"
      >
        <template #label> name </template>
      </WInputText>
    </div>
    <div class="profile-account-form__option">
      <WInputImage
        disable-spellcheck
        :value="userLogo"
        :is-pending="updateProfilePending"
        :is-disabled="updateProfilePending || !passwordIsEntered"
        @input="userLogo = $event"
        @enter="updateProfileHandler"
      >
        <template #label> photo url </template>
      </WInputImage>
    </div>
    <div class="profile-account-form__option _action">
      <WButton
        large
        :theme="Themes.ORANGE"
        :is-pending="updateProfilePending"
        :is-disabled="submitIsDisabled"
        @click="updateProfileHandler"
      >
        update account
      </WButton>
      <WButton
        large
        :theme="Themes.RED"
        :is-pending="deleteAccountPending"
        :is-disabled="submitIsDisabled"
        @click="deleteProfileHandler"
      >
        delete account
      </WButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth/store'
import { useProfileStore } from '@/stores/profile/store'
import { Themes } from '@/helpers/enum/w-button'
import { Names } from '@/helpers/enum/router'

import WInputPassword from '@/components/shared/w-input-password/WInputPassword.vue'
import WInputText from '@/components/shared/w-input-text/WInputText.vue'
import WInputImage from '@/components/shared/w-input-image/WInputImage.vue'
import WButton from '@/components/shared/w-button/WButton.vue'

const router = useRouter()
const authStore = useAuthStore()
const profileStore = useProfileStore()

const password = ref('')
const userName = ref('')
const userLogo = ref('')
const passwordIsValid = ref(false)

const emailProvider = computed(() => authStore?.emailProvider)
const profileIsPending = computed(() => profileStore?.profileIsPending)
const updateProfilePending = computed(() => profileStore?.updateProfilePending)
const deleteAccountPending = computed(() => profileStore?.deleteAccountPending)
const userNameValue = computed(() => profileStore?.userName)
const userLogoValue = computed(() => profileStore?.userLogo)
const passwordIsEntered = computed(() => !emailProvider.value || passwordIsValid.value)
const submitIsDisabled = computed(() => profileIsPending.value || !passwordIsEntered.value)

//todo: try to not use reAuthAction

const updateProfileHandler = async () => {
  if (submitIsDisabled.value) {
    return
  }
  const authFormData = { password: password.value }
  const authResponse = await authStore.reAuthAction(authFormData)
  if (!authResponse.success) {
    return
  }
  const profileFormData = { displayName: userName.value, photoURL: userLogo.value }
  const profileResponse = await profileStore.updateProfileAction(profileFormData)
  if (!profileResponse.success) {
    return
  }
  const updateResponse = await profileStore.getProfileAction()
  if (!updateResponse.success) {
    return
  }
  // todo: notification
}

const deleteProfileHandler = async () => {
  if (submitIsDisabled.value) {
    return
  }
  const authFormData = { password: password.value }
  const authResponse = await authStore.reAuthAction(authFormData)
  if (!authResponse.success) {
    return
  }
  const profileResponse = await profileStore.deleteAccountAction()
  if (!profileResponse.success) {
    return
  }
  // todo: notification
  await router.push({ name: Names.AUTH_LOGOUT })
}

onBeforeMount(() => {
  userName.value = userNameValue.value || ''
  userLogo.value = userLogoValue.value || ''
})
</script>


<style scoped lang="scss">
.profile-account-form {
  &__option {
    margin-bottom: 33px;

    &._action {
      display: grid;
      grid-template-columns: 1fr 1fr;
      margin-top: 66px;
      gap: 10px;
    }
  }
}
</style>
