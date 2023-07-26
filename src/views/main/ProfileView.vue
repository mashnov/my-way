<template>
  <div class="profile-view">
    <template v-if="isNavigation">
      <WSubNavigation :options="navigation" />
      <WRouterView />
    </template>
    <template v-else>
      <WDivider :text="profileFormLabel" />
      <WFormWrapper>
        <WTransition appear>
          <Component :is="profileFormComponent" />
        </WTransition>
      </WFormWrapper>
    </template>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, computed } from 'vue'
import { navigation } from '@/helpers/dictionaries/profile-navigation'
import { Names } from '@/helpers/enum/router'

import WDivider from '@/components/shared/w-divider/WDivider.vue'
import WTransition from '@/components/shared/w-transition/WTransition.vue'
import WSubNavigation from '@/components/shared/w-sub-navigation/WSubNavigation.vue'
import WRouterView from '@/components/shared/w-router-view/WRouterView.vue'
import WFormWrapper from '@/components/shared/w-form-wrapper/WFormWrapper.vue'

const props = defineProps<{
  name: Names
}>()

const isNavigation = computed(() => Names.PROFILE === props.name)

const profileFormLabel = computed(() => {
  switch (props.name) {
    case Names.ACCOUNT:
      return 'Account settings'
    case Names.EMAIL:
      return 'Email settings'
    case Names.PASSWORD:
      return 'Password settings'
    default:
      return ''
  }
})

const profileFormComponent = computed(() => {
  switch (props.name) {
    case Names.ACCOUNT:
      return defineAsyncComponent(() => import('@/components/main/profile/ProfileAccountForm.vue'))
    case Names.EMAIL:
      return defineAsyncComponent(() => import('@/components/main/profile/ProfileEmailForm.vue'))
    case Names.PASSWORD:
      return defineAsyncComponent(() => import('@/components/main/profile/ProfilePasswordForm.vue'))
    default:
      return null
  }
})
</script>
