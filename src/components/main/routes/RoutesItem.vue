<template>
  <RouterLink
    class="routes-item"
    :to="routeLink"
  >
    <div class="routes-item__title">
      <span class="routes-item__name">{{ props.route.name }}</span>
      <span class="routes-item__date">{{ props.route.date }}</span>
    </div>
    <div class="routes-item__places">
      <span class="routes-item__string">From: {{ placeFrom.name }}</span>
      <span class="routes-item__string">To: {{ placeTo.name }}</span>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePlacesStore } from '@/stores/places/store'
import { RoutesType } from '@/helpers/types/routes'
import { Names } from '@/helpers/enum/router'

type PropsTypes = {
  route: RoutesType
}

const props = defineProps<PropsTypes>()
const placesStore = usePlacesStore()

const placesList = computed(() => placesStore.placesList)

const routeLink = computed(() => ({
  name: Names.ROUTES_DETAILS,
  params: { id: props.route.id },
}))

const placeFrom = computed(() => placesList.value.find(place => place.id === props.route.from))
const placeTo = computed(() => placesList.value.find(place => place.id === props.route.to))
</script>

<style scoped lang="scss">
.routes-item {
  padding: 8px 22px;
  border-radius: 8px;
  border: solid 1px #d1d9e3;
  background-color: #ffffff;
  transition: transform 0.1s $easing;

  &:hover {
    transform: scale(0.98);
  }

  &__title {
    padding-top: 5px;
    padding-bottom: 5px;
    margin-bottom: 15px;
    border-bottom: 1px solid #d7e1ee;
    text-align: right;
  }

  &__name {
    display: block;
    color: #79cb63;
    line-height: 24px;
    font-size: 18px;
    font-weight: 600;
    text-transform: uppercase;
  }

  &__date {
    display: block;
    color: #59697e;
    line-height: 18px;
    font-size: 14px;
    font-weight: 500;
  }

  &__places {
    margin-top: 15px;
  }

  &__string {
    display: block;
    color: #59697e;
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;
  }
}
</style>
