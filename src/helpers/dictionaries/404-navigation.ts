import { Names } from '@/helpers/enum/router'
import { Themes } from '@/helpers/enum/w-sub-navigation'

export const anonimNavigation = [
  {
    theme: Themes.BLUE,
    name: Names.ABOUT,
    label: 'About',
  },
  {
    theme: Themes.GREEN,
    name: Names.AUTH_LOGIN,
    label: 'Login',
  },
  {
    theme: Themes.ORANGE,
    name: Names.AUTH_REGISTER,
    label: 'Register',
  },
]

export const authorizedNavigation = [
  {
    theme: Themes.ORANGE,
    name: Names.PROFILE,
    label: 'Profile',
  },
  {
    theme: Themes.GREEN,
    name: Names.ROUTES,
    label: 'Routes',
  },
  {
    theme: Themes.BLUE,
    name: Names.VIEWER,
    label: 'Map viewer',
  },
]
