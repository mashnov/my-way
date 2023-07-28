<template>
  <RouterLink
    class="places-item"
    :to="placeLink"
  >
    <div class="places-item__title">
      <span class="places-item__name">{{ props.place.name }}</span>
      <span class="places-item__date">{{ props.place.date }}</span>
    </div>
    <div class="places-item__address">
      <span class="places-item__string">{{ props.place.country }},</span>
      <span class="places-item__string">{{ props.place.state }},</span>
      <span class="places-item__string">{{ props.place.city}},</span>
      <span class="places-item__string">{{ props.place.street}}, {{ props.place.building }}</span>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { PlacesType } from '@/helpers/types/places'
import { Names } from '@/helpers/enum/router'

type PropsTypes = {
  place: PlacesType
}

const props = defineProps<PropsTypes>()

const placeLink = computed(() => ({
  name: Names.PLACES_DETAILS,
  params: { id: props.place.id },
}))
</script>

<style scoped lang="scss">
.places-item {
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
    color: #0076ff;
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

  &__address {
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
