import { DateTime } from 'luxon'

export const getCurrentDate = (outputDateFormat = 'yyyy-LL-dd HH:mm:ss') => {
  const currentLuxonDate = DateTime.local()
  return currentLuxonDate.toFormat(outputDateFormat)
}

export const sortByDate = (array, field, dateFormat = 'yyyy-LL-dd HH:mm:ss') => {
  return array.sort((item1, item2) => {
    const dateString1 = item1[field]
    const dateString2 = item2[field]
    const luxonDate1 = DateTime.fromFormat(dateString1, dateFormat)
    const luxonDate2 = DateTime.fromFormat(dateString2, dateFormat)
    return luxonDate2 - luxonDate1
  })
}
