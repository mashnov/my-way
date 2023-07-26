import { Names } from '@/helpers/enum/router'
import { Themes } from '@/helpers/enum/w-sub-navigation'

export const navigation = [
  {
    theme: Themes.BLUE,
    name: Names.PLACES_LIST,
    label: 'Place List',
  },
  {
    theme: Themes.GREEN,
    name: Names.PLACES_ADD,
    label: 'Add New Place',
  },
]
