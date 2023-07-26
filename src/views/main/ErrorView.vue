<template>
  <div class="error-view">
    <WSubNavigation :options="navigationList" />
    <WDivider text="Page not found" />
    <WFormWrapper small>
      <WUnicorn />
    </WFormWrapper>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth/store'
import { anonimNavigation, authorizedNavigation } from '@/helpers/dictionaries/404-navigation'

import WDivider from '@/components/shared/w-divider/WDivider.vue'
import WSubNavigation from '@/components/shared/w-sub-navigation/WSubNavigation.vue'
import WFormWrapper from '@/components/shared/w-form-wrapper/WFormWrapper.vue'
import WUnicorn from '@/components/shared/w-unicorn/WUnicorn.vue'

const authStore = useAuthStore()
const isAuthed = computed(() => authStore?.isAuthed)

const navigationList = computed(() => (isAuthed.value ? authorizedNavigation : anonimNavigation))
</script>
