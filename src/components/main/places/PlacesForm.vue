<template>
  <WFormWrapper>
    <div class="places-form">
      <div class="places-form__option">
        <WInputText
          :value="name"
          @input="name = $event"
        >
          <template #label> place name </template>
        </WInputText>
      </div>
      <div class="places-form__option">
        <WInputText
          :value="country"
          @input="country = $event"
        >
          <template #label> country </template>
        </WInputText>
      </div>
      <div class="places-form__option">
        <WInputText
          :value="state"
          @input="state = $event"
        >
          <template #label> state </template>
        </WInputText>
      </div>
      <div class="places-form__option">
        <WInputText
          :value="city"
          @input="city = $event"
        >
          <template #label> city </template>
        </WInputText>
      </div>
      <div class="places-form__option">
        <WInputText
          :value="street"
          @input="street = $event"
        >
          <template #label> street </template>
        </WInputText>
      </div>
      <div class="places-form__option">
        <WInputText
          :value="building"
          @input="building = $event"
        >
          <template #label> building number </template>
        </WInputText>
      </div>
      <div v-if="placeId" class="places-form__option _action">
        <WButton
          large
          :theme="Themes.BLUE"
          :is-pending="updateAddressPending"
          :is-disabled="updateAddressPending"
          @click="updateAddressHandler"
        >
          update address
        </WButton>
        <WButton
          large
          :theme="Themes.RED"
          :is-pending="deleteAddressPending"
          :is-disabled="deleteAddressPending"
          @click="deleteAddressHandler"
        >
          delete address
        </WButton>
      </div>
      <div v-else class="places-form__option _submit">
        <WButton
          large
          :theme="Themes.GREEN"
          :is-pending="addAddressPending"
          :is-disabled="addAddressPending"
          @click="addAddressHandler"
        >
          add address
        </WButton>
      </div>
    </div>
  </WFormWrapper>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePlacesStore } from '@/stores/places/store'
import { useProfileStore } from '@/stores/profile/store'
import { getCurrentDate } from '@/helpers/functions/date'
import { Themes } from '@/helpers/enum/w-button'
import { Names } from '@/helpers/enum/router'

import WFormWrapper from '@/components/shared/w-form-wrapper/WFormWrapper.vue'
import WInputText from '@/components/shared/w-input-text/WInputText.vue'
import WButton from '@/components/shared/w-button/WButton.vue'

const route = useRoute();
const router = useRouter();
const placesStore = usePlacesStore()
const profileStore = useProfileStore()

const name = ref('')
const country = ref('')
const state = ref('')
const city = ref('')
const street = ref('')
const building = ref('')

const userId = computed(() => profileStore.userId)
const placeId = computed(() => route.params.id)
const placesList = computed(() => placesStore.placesList)
const addAddressPending = computed(() => placesStore.addAddressPending)
const updateAddressPending = computed(() => placesStore.updateAddressPending)
const deleteAddressPending = computed(() => placesStore.deleteAddressPending)

const placeOption = computed(() => placesList.value.find((place) => place.id === placeId.value))

const presetPlaceData = () => {
  name.value = placeOption.value.name
  country.value = placeOption.value.country
  state.value = placeOption.value.state
  city.value = placeOption.value.city
  street.value = placeOption.value.street
  building.value = placeOption.value.building
}

const addAddressHandler = async () => {
  const placeResponse = await placesStore.addPlaceAction({
    uid: String(userId.value),
    date: getCurrentDate(),
    name: name.value,
    country: country.value,
    state: state.value,
    city: city.value,
    street: street.value,
    building: building.value,
  })
  if (!placeResponse.success) {
    // todo: notification
    return
  }
  await router.push({ name: Names.PLACES })
}
const updateAddressHandler = async () => {
  const placeResponse = await placesStore.updatePlaceAction({
    id: placeOption.value.id,
    date: placeOption.value.date,
    uid: String(userId.value),
    name: name.value,
    country: country.value,
    state: state.value,
    city: city.value,
    street: street.value,
    building: building.value,
  })
  if (!placeResponse.success) {
    // todo: notification
    return
  }
  await router.push({ name: Names.PLACES })
}

const deleteAddressHandler = async () => {
  const placeResponse = await placesStore.deleteAddressHandler(placeOption.value)
  if (!placeResponse.success) {
    // todo: notification
    return
  }
  await router.push({ name: Names.PLACES })
}

onBeforeMount(() => {
  if (placeId.value) {
    presetPlaceData()
  }
})
</script>

<style scoped lang="scss">
.places-form {
  &__option {
    margin-bottom: 33px;

    &._action {
      display: grid;
      grid-template-columns: 1fr 1fr;
      margin-top: 66px;
      gap: 10px;
    }

    &._submit {
      margin-top: 66px;
    }
  }
}
</style>
