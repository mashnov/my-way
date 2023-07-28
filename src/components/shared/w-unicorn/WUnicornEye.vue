<template>
  <div
    ref="htmlElement"
    class="w-unicorn-eye"
  >
    <div
      class="w-unicorn-eye__pupil"
      :style="pupilTransformStyle"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onBeforeMount, onBeforeUnmount } from 'vue'

type PropTypes = {
  correction: number
}

const props = defineProps<PropTypes>()

const htmlElement = ref()
const mousePositionX = ref(0)
const mousePositionY = ref(0)
const eyeCenterOffsetX = ref(0)
const eyeCenterOffsetY = ref(0)

const pupilTransformStyle = computed(() => {
  const radValue = mousePositionY.value < 0 ? Math.PI / 4 : (7 * Math.PI) / 2.15
  const arcTg = Math.atan(mousePositionX.value / mousePositionY.value)
  const pupilRadPosition = radValue - arcTg
  const pupilDegreePosition = pupilRadPosition * (180 / Math.PI)
  const rotateValue = pupilDegreePosition - props.correction;
  return { transform: `rotate(${rotateValue}deg)` };
})

const addMouseMoveListener = () => {
  document.addEventListener('mousemove', (event) => {
    setEyeTransformValue(event)
  })
}
const removeMouseMoveListener = () => {
  document.removeEventListener('mousemove', (event) => {
    setEyeTransformValue(event)
  })
}
const setEyeTransformValue = ({ x = 0, y = 0 }) => {
  mousePositionX.value = x - eyeCenterOffsetX.value
  mousePositionY.value = y - eyeCenterOffsetY.value
}
const setEyeCenterOffset = () => {
  if (!htmlElement.value) {
    return
  }
  const block = htmlElement.value
  const blockOptions = block.getClientRects()
  const blockHeight = blockOptions[0].height
  const blockWidth = blockOptions[0].width
  const blockTopOffset = blockOptions[0].top
  const blockLeftOffset = blockOptions[0].left
  eyeCenterOffsetX.value = blockLeftOffset + (blockWidth / 2)
  eyeCenterOffsetY.value = blockTopOffset + (blockHeight / 2)
}

watch(() => props.correction, () => {
  setEyeCenterOffset()
})

onBeforeMount(() => {
  addMouseMoveListener()
  setEyeCenterOffset()
})

onBeforeUnmount(() => {
  removeMouseMoveListener()
})
</script>

<style lang="scss" scoped>
  .w-unicorn-eye {
    position: relative;
    display: block;
    width: 100%;
    padding-bottom: 100%;
    background: #fff;
    border-radius: 50%;
    border: 2px solid #000;
    &__pupil {
      position: absolute;
      display: block;
      width: 27%;
      height: 27%;
      left: 12%;
      top: 12%;
      background-color: #000;
      border-radius: 50%;
      transform: rotate(0);
      transform-origin: 140% 140%;
    }
  }
</style>
