<template>
  <div class="places-form">
    <div class="places-form__option">
      <WInputText
        :value="address"
        @input="address = $event"
        @enter="submitClickHandler"
      >
        <template #label> address </template>
      </WInputText>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import WInputText from '@/components/shared/w-input-text/WInputText.vue'

const address = ref('')

const submitClickHandler = async () => {
  fetch(`http://autocomplete.travelpayouts.com/places2?term=${address.value}&locale=en&types[]=country&callba0ck`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => console.error(error))
}
</script>

<style scoped lang="scss">
.places-form {
  &__option {
    margin-bottom: 33px;

    &._submit {
      margin-top: 66px;
    }
  }
}
</style>
