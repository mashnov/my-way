<template>
  <div
    class="w-project-logo"
    @click="clickHandler"
  >
    <ProjectLogo />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Names } from '@/helpers/enum/router'

import ProjectLogo from '@/icons/app/logo.svg'

const router = useRouter()

const clickHandler = () => {
  router.push({ name: Names.ABOUT })
}

</script>

<style scoped lang="scss">
.w-project-logo {
  width: 40px;
  cursor: pointer;

  svg {
    width: 100%;
    transition: background 0.15s $easing, transform 0.15s $easing, filter 0.15s $easing;
    filter: drop-shadow(1px 1px 1px rgba(#000000, 0.6));

    &:hover {
      filter: drop-shadow(2px 2px 2px rgba(#000000, 0.5));
      transform: scale(1.1);
    }
    &:active {
      filter: drop-shadow(3px 3px 3px rgba(#000000, 0.4));
      transform: scale(1.3);
    }
  }
}
</style>
