<template>
  <div class="w-unicorn">
    <div
      class="w-unicorn__head"
      :style="headStyle"
    >
      <div class="w-unicorn__head-eye">
        <WUnicornEye
          :correction="headTransformValue"
        />
      </div>
      <div class="w-unicorn__head-eye">
        <WUnicornEye
          :correction="headTransformValue"
        />
      </div>
      <WUnicornHead />
    </div>
    <div class="w-unicorn__body">
      <WUnicornBody
        class="w-unicorn__main-body"
      />
      <WUnicornLegLeft
        class="w-unicorn__leg _left"
        :style="leftLegStyle"
      />
      <WUnicornLegRight
        class="w-unicorn__leg _right"
        :style="rightLegStyle"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount, onBeforeUnmount } from 'vue'
import { getRandomNumber } from '@/helpers/functions/number'

import WUnicornEye from './WUnicornEye.vue'
import WUnicornHead from '@/icons/unicorn/head.svg'
import WUnicornBody from '@/icons/unicorn/body.svg'
import WUnicornLegLeft from '@/icons/unicorn/leg-left.svg'
import WUnicornLegRight from '@/icons/unicorn/leg-right.svg'

const HEAD_INTERVAL_VALUE = 2000;
const LEFT_LEG_INTERVAL_VALUE = 500;
const RIGHT_LEG_INTERVAL_VALUE = 800;

const MIN_HEAD_TRANSFORM_VALUE = -23;
const MAX_HEAD_TRANSFORM_VALUE = 23;

const MIN_LEFT_LEG_TRANSFORM_VALUE = -20;
const MAX_LEFT_LEG_TRANSFORM_VALUE = 5;

const MIN_RIGHT_LEG_TRANSFORM_VALUE = -5;
const MAX_RIGHT_LEG_TRANSFORM_VALUE = 20;

const headInterval = ref(0)
const leftLegInterval = ref(0)
const rightLegInterval = ref(0)
const headTransformValue = ref(0)
const leftLegTransformValue = ref(0)
const rightLegTransformValue = ref(0)

const headStyle = computed(() => {
  return { transform: `rotate(${headTransformValue.value}deg)` }
})
const leftLegStyle = computed(() => {
  return { transform: `rotate(${leftLegTransformValue.value}deg)` }
})
const rightLegStyle = computed(() => {
  return { transform: `rotate(${rightLegTransformValue.value}deg)` }
})

const setHeadTransformValue = () => {
  headTransformValue.value = getRandomNumber(MIN_HEAD_TRANSFORM_VALUE, MAX_HEAD_TRANSFORM_VALUE)
}
const setLeftLegTransformValue = () => {
  leftLegTransformValue.value = getRandomNumber(MIN_LEFT_LEG_TRANSFORM_VALUE, MAX_LEFT_LEG_TRANSFORM_VALUE)
}
const setRightLegTransformValue = () => {
  rightLegTransformValue.value = getRandomNumber(MIN_RIGHT_LEG_TRANSFORM_VALUE, MAX_RIGHT_LEG_TRANSFORM_VALUE)
}


onBeforeMount(() => {
  headInterval.value = setInterval(() => {
    setHeadTransformValue()
  }, HEAD_INTERVAL_VALUE)
  leftLegInterval.value = setInterval(() => {
    setLeftLegTransformValue()
  }, LEFT_LEG_INTERVAL_VALUE)
  rightLegInterval.value = setInterval(() => {
    setRightLegTransformValue()
  }, RIGHT_LEG_INTERVAL_VALUE)
})

onBeforeUnmount(() => {
  if (headInterval.value) {
    clearInterval(headInterval.value)
  }
  if (leftLegInterval.value) {
    clearInterval(leftLegInterval.value)
  }
  if (rightLegInterval.value) {
    clearInterval(rightLegInterval.value)
  }
})
</script>

<style lang="scss" scoped>
.w-unicorn {
  &__head {
    position: relative;
    display: block;
    width: 100%;
    margin: 0 auto -22% auto;
    transform-origin: 50% 78%;
    transition: transform 0.5s $easing;
    will-change: transform;
    z-index: 2;
    & svg {
      display: block;
      width: 100%;
    }
    &-eye {
      position: absolute;
      width: 18%;
      z-index: 3;
      &:nth-child(1) {
        left: 27%;
        bottom: 30%;
      }
      &:nth-child(2) {
        right: 29%;
        bottom: 32%;
      }
    }
  }
  &__body {
    position: relative;
    display: block;
    width: 100%;
    z-index: 1;
  }
  &__main-body {
    display: block;
    width: 100%;
    margin: 0 auto;
    color: #3cb5c3;
  }
  &__leg {
    position: absolute;
    transform-origin: 50% 70%;
    transition: transform 0.5s $easing;
    will-change: transform;
    width: 25%;
    color: #42c3d2;
    &._left {
      left: 3%;
      bottom: 6%;
    }
    &._right {
      right: 3%;
      bottom: 3%;
    }
  }
}
</style>
