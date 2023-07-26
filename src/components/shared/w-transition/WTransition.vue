<template>
  <Transition :appear="props.appear" :duration="props.duration" :name="props.name" mode="out-in">
    <slot />
  </Transition>
</template>

<script setup lang="ts">
import { Animations } from '@/helpers/enum/w-transition'

type PropsTypes = {
  name?: Animations
  appear?: boolean
  duration?: number
}

const props = withDefaults(defineProps<PropsTypes>(), {
  name: Animations.FADE,
  duration: 120,
})
</script>
