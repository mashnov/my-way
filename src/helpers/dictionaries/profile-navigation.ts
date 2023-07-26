import { Names } from '@/helpers/enum/router'
import { Themes } from '@/helpers/enum/w-sub-navigation'

export const navigation = [
  {
    theme: Themes.ORANGE,
    name: Names.ACCOUNT,
    label: 'Account',
  },
  {
    theme: Themes.GREEN,
    name: Names.EMAIL,
    label: 'Email',
  },
  {
    theme: Themes.BLUE,
    name: Names.PASSWORD,
    label: 'Password',
  },
]
