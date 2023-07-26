<template>
  <div class="auth-view">
    <template v-if="!isLogoutForm">
      <AuthGoogleForm />
      <WDivider text="or" />
    </template>
    <WFormWrapper>
      <WTransition appear>
        <Component :is="authFormComponent" />
      </WTransition>
    </WFormWrapper>
  </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import { Names } from '@/helpers/enum/router'

import WDivider from '@/components/shared/w-divider/WDivider.vue'
import WTransition from '@/components/shared/w-transition/WTransition.vue'
import AuthGoogleForm from '@/components/main/auth/AuthGoogleForm.vue'
import WFormWrapper from '@/components/shared/w-form-wrapper/WFormWrapper.vue'

type PropTypes = {
  name: Names
}

const props = defineProps<PropTypes>()

const isLogoutForm = computed(() => props.name === Names.AUTH_LOGOUT)

const authFormComponent = computed(() => {
  switch (props.name) {
    case Names.AUTH_LOGIN:
      return defineAsyncComponent(() => import('@/components/main/auth/AuthLoginForm.vue'))
    case Names.AUTH_REGISTER:
      return defineAsyncComponent(() => import('@/components/main/auth/AuthRegisterForm.vue'))
    case Names.AUTH_FORGOT:
      return defineAsyncComponent(() => import('@/components/main/auth/AuthForgotForm.vue'))
    case Names.AUTH_LOGOUT:
      return defineAsyncComponent(() => import('@/components/main/auth/AuthLogoutForm.vue'))
    default:
      return null
  }
})
</script>
