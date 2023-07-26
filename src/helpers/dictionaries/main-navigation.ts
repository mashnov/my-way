import { Names } from '@/helpers/enum/router'
import { Types } from '@/helpers/enum/w-navigation'
import { Labels } from '@/helpers/enum/w-navigation'
export const navigation = [
  {
    name: Names.PROFILE,
    authed: true,
    type: Types.PROFILE,
    label: Labels.PROFILE,
  },
  {
    authed: false,
    name: Names.AUTH_LOGIN,
    type: Types.LINK,
    label: Labels.LOGIN,
  },
  {
    authed: false,
    name: Names.AUTH_REGISTER,
    type: Types.LINK,
    label: Labels.REGISTER,
  },
  {
    authed: false,
    name: Names.AUTH_FORGOT,
    type: Types.LINK,
    label: Labels.FORGOT,
  },
  {
    authed: true,
    name: Names.PLACES,
    type: Types.LINK,
    label: Labels.PLACES,
  },
  {
    authed: true,
    name: Names.ROUTES,
    type: Types.LINK,
    label: Labels.ROUTES,
  },
  {
    authed: true,
    name: Names.VIEWER,
    type: Types.LINK,
    label: Labels.VIEWER,
  },
  {
    authed: true,
    name: Names.AUTH_LOGOUT,
    type: Types.LINK,
    label: Labels.LOGOUT,
  },
]
