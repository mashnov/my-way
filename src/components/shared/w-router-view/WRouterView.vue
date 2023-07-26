<template>
  <RouterView v-slot="{ Component }">
    <WTransition>
      <Component :is="Component" />
    </WTransition>
  </RouterView>
</template>

<script setup lang="ts">
import WTransition from '@/components/shared/w-transition/WTransition.vue'
</script>
