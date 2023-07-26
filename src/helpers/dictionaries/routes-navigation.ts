import { Names } from '@/helpers/enum/router'
import { Themes } from '@/helpers/enum/w-sub-navigation'

export const navigation = [
  {
    theme: Themes.BLUE,
    name: Names.ROUTES_LIST,
    label: 'Route List',
  },
  {
    theme: Themes.ORANGE,
    name: Names.ROUTES_ADD,
    label: 'Add New Route',
  },
]
