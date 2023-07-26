<template>
  <div class="routes-form">
    <div class="routes-form__option">
      <WInputEmail
        :value="email"
        :is-pending="forgotPending"
        :is-disabled="authIsPending"
        @input="email = $event"
        @set-is-valid="emailIsValid = $event"
        @enter="submitClickHandler"
      >
        <template #label> email </template>
      </WInputEmail>
    </div>
    <div class="routes-form__option _submit">
      <WButton
        large
        :theme="Themes.ORANGE"
        :is-pending="forgotPending"
        :is-disabled="submitIsDisabled"
        @click="submitClickHandler"
      >
        Submit
      </WButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth/store'
import { Themes } from '@/helpers/enum/w-button'
import { Names } from '@/helpers/enum/router'

import WInputEmail from '@/components/shared/w-input-email/WInputEmail.vue'
import WButton from '@/components/shared/w-button/WButton.vue'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const emailIsValid = ref(false)
const authIsPending = computed(() => authStore?.authIsPending)
const forgotPending = computed(() => authStore?.forgotPending)
const submitIsDisabled = computed(() => !emailIsValid.value || authIsPending.value)

const submitClickHandler = async () => {
  if (submitIsDisabled.value) {
    return
  }
  const authFormData = { username: email.value }
  const authResponse = await authStore.forgotAction(authFormData)
  if (!authResponse.success) {
    return
  }
  await router.push({ name: Names.AUTH_LOGIN })
}
</script>

<style scoped lang="scss">
.routes-form {
  &__option {
    margin-bottom: 33px;

    &._submit {
      margin-top: 66px;
    }
  }
}
</style>
