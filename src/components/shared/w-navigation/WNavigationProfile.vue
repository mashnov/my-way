<template>
  <RouterLink class="w-navigation_profile" :class="optionIsActive && '_active'" :to="{ name: props.option.name }">
    <div class="w-navigation_profile__image">
      <WTransition appear>
        <img
          v-if="profileLogoIsVisible"
          :src="profileLogoUrl"
          :alt="profileLetter"
          @error="profileImageIsError = true"
        />
        <span v-else>
          {{ profileLetter }}
        </span>
      </WTransition>
    </div>
    <div class="w-navigation_profile__details">
      <span class="w-navigation_profile__details-item" v-if="userName">{{ userName }}</span>
      <span class="w-navigation_profile__details-item" v-if="userEmail">{{ userEmail }}</span>
      <span class="w-navigation_profile__status">
        <WTooltip
          v-for="({ label, active }, index) in profileOptions"
          :key="index"
          class="w-navigation_profile__status-item"
          :class="active && '_active'"
          :position="Position.BOTTOM" :text="label"
        >
          <Star class="w-navigation_profile__status-icon" />
        </WTooltip>
      </span>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { ref, computed, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth/store'
import { useProfileStore } from '@/stores/profile/store'
import { Option } from '@/helpers/types/w-navigation'
import { Position } from '@/helpers/enum/w-tooltip'

import WTransition from '@/components/shared/w-transition/WTransition.vue'
import WTooltip from '@/components/shared/w-tooltip/WTooltip.vue'

const Star = defineAsyncComponent(() => import('@/icons/profile/star.svg'))

type PropTypes = {
  option: Option
}

const props = defineProps<PropTypes>()

const route = useRoute()
const authStore = useAuthStore()
const profileStore = useProfileStore()

const profileImageIsError = ref(false)

const emailProvider = computed(() => authStore?.emailProvider)
const profileLogoUrl = computed(() => profileStore.userLogo)
const userName = computed(() => profileStore.userName)
const userEmail = computed(() => profileStore.userEmail)
const emailVerified = computed(() => profileStore.emailVerified)
const profileName = computed(() => userName.value || userEmail.value || '')
const profileLetter = computed(() => profileName.value[0])
const userLogoIsSet = computed(() => (profileLogoUrl.value || '').trim().length)
const userNameIsSet = computed(() => (userName.value || '').trim().length)
const profileLogoIsVisible = computed(() => userLogoIsSet.value && !profileImageIsError.value)
const optionIsActive = computed(() => route?.matched.some(({ name }) => name === props.option.name))

const profileOptions = computed(() => [
  {
    label: userLogoIsSet.value ? 'Photo is set' : 'Photo is not set',
    active: userLogoIsSet.value,
  },
  {
    label: userNameIsSet.value ? 'User Name is set' : 'User Name is not set',
    active: userNameIsSet.value,
  },
  {
    label: emailVerified.value ? 'Email is verified' : 'Email is not verified',
    active: emailVerified.value,
  },
  {
    label: emailProvider.value ? 'Password is set' : 'Password is not set',
    active: emailProvider.value,
  },
])
</script>

<style scoped lang="scss">
.w-navigation_profile {
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr;
  border-radius: 8px;
  width: 100%;
  padding: 12px 16px;
  background-color: rgba(#ffffff, 0.6);
  transition: background-color 0.15s $easing;
  box-shadow: 0 0 10px -5px #000000;
  cursor: pointer;

  &:hover {
    background-color: rgba(#ffffff, 0.9);
  }

  &._active {
    background-color: rgba(#ffffff, 1);
  }

  &__image {
    position: relative;

    img {
      display: block;
      min-width: 70px;
      height: 70px;
      border-radius: 5px;
      box-shadow: 0 0 1px rgba(#000000, 0.3);
    }

    span {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      font-weight: 600;
      text-transform: uppercase;
      width: 70px;
      height: 70px;
      color: #59697e;
      border-radius: 5px;
      box-shadow: 0 0 1px rgba(#000000, 0.3);
    }
  }

  &__details {
    margin-left: 12px;

    &-item {
      display: block;
      text-transform: uppercase;

      &:nth-child(1) {
        font-size: 18px;
        font-weight: 500;
        line-height: 24px;
        color: #59697e;
      }

      &:nth-child(2) {
        font-size: 12px;
        font-weight: 500;
        line-height: 16px;
        color: #59697e;
      }
    }
  }
  &__status {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-top: 5px;

    &-item {
      color: #feca47;
      transition: color 0.15s $easing;

      &._active {
        color: #77e27d;
      }

      &:not(:last-child) {
        margin-right: 4px;
      }
    }

    &-icon {
      display: block;
      height: 22px;
      color: inherit;
      filter: drop-shadow(0 0 1px rgba(#000000, 0.3));
    }
  }
}
</style>
