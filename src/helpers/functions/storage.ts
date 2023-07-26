import { localStorageSetType } from '@/helpers/types/helpers'
import { localStorageGetType } from '@/helpers/types/helpers'

export const setLocalStorageValue = (props: localStorageSetType) => {
  const hourValue = props.hours || 24
  const currentTime = new Date().getTime()
  const expire = currentTime + hourValue * 60 * 60 * 1000
  const optionKey = `${props.key}_${props.userId}`
  localStorage.setItem(optionKey, JSON.stringify({ value: props.value, expire }))
}

export const getLocalStorageValue = (props: localStorageGetType) => {
  const optionKey = `${props.key}_${props.userId}`
  const string = localStorage.getItem(optionKey)
  const option = JSON.parse(string || '{}')
  const currentTime = new Date().getTime()
  if (!string) {
    return null
  } else if (currentTime > option?.expire) {
    removeLocalStorageValue(props)
    return null
  }
  return option.value
}

export const removeLocalStorageValue = (props: localStorageGetType) => {
  const optionKey = `${props.key}_${props.userId}`
  localStorage.removeItem(optionKey)
}
