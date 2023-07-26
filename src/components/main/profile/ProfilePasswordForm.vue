<template>
  <div class="profile-password-form">
    <div
      v-if="emailProvider"
      class="profile-password-form__option"
    >
      <WInputPassword
        :value="password"
        :is-pending="profileIsPending"
        :is-disabled="profileIsPending"
        @input="password = $event"
        @set-is-valid="passwordIsValid = $event"
      >
        <template #label> old password </template>
      </WInputPassword>
    </div>
    <div class="profile-password-form__option">
      <WInputPassword
        :value="password1"
        :is-pending="updatePasswordPending"
        :is-disabled="updatePasswordPending || !passwordIsEntered"
        @input="password1 = $event"
        @set-is-valid="password1IsValid = $event"
        @enter="changeClickHandler"
      >
        <template #label> new password </template>
      </WInputPassword>
    </div>
    <div class="profile-password-form__option">
      <WInputPassword
        show-hint
        :value="password2"
        :is-pending="updatePasswordPending"
        :is-disabled="updatePasswordPending || !passwordIsEntered"
        @input="password2 = $event"
        @enter="changeClickHandler"
      >
        <template #label> retype password </template>
      </WInputPassword>
    </div>
    <div class="profile-password-form__option _submit">
      <WButton
        large
        :theme="Themes.BLUE"
        :is-pending="updatePasswordPending"
        :is-disabled="changeIsDisabled"
        @click="changeClickHandler"
      >
        <template v-if="emailProvider">change password</template>
        <template v-else>set password</template>
      </WButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useAuthStore } from '@/stores/auth/store'
import { useProfileStore } from '@/stores/profile/store'
import { Themes } from '@/helpers/enum/w-button'

import WInputPassword from '@/components/shared/w-input-password/WInputPassword.vue'
import WButton from '@/components/shared/w-button/WButton.vue'

const authStore = useAuthStore()
const profileStore = useProfileStore()

const password = ref('')
const password1 = ref('')
const password2 = ref('')
const passwordIsValid = ref(false)
const password1IsValid = ref(false)

const emailProvider = computed(() => authStore?.emailProvider)
const updatePasswordPending  = computed(() => profileStore?.updatePasswordPending)
const profileIsPending = computed(() => profileStore?.profileIsPending)
const passwordIsMatch = computed(() => !!password1.value.length && password1.value === password2.value)
const passwordIsEntered = computed(() => !emailProvider.value || passwordIsValid.value)
const changeIsDisabled = computed(() => profileIsPending.value || !passwordIsEntered.value || !passwordIsMatch.value)

const changeClickHandler = async () => {
  if (changeIsDisabled.value) {
    return
  }
  const authFormData = { password: password.value }
  const authResponse = await authStore.reAuthAction(authFormData)
  if (!authResponse.success) {
    return
  }
  const profileFormData = { password: password1.value }
  const profileResponse = await profileStore.updatePasswordAction(profileFormData)
  if (!profileResponse.success) {
    return
  }
  const updateResponse = await profileStore.getProfileAction()
  if (!updateResponse.success) {
    return
  }
  // todo: notification
}
</script>


<style scoped lang="scss">
.profile-password-form {
  &__option {
    margin-bottom: 33px;

    &._submit {
      margin-top: 66px;
    }
  }
}
</style>
