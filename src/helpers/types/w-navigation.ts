import { Names } from '@/helpers/enum/router'
import { Types } from '@/helpers/enum/w-navigation'
import { Labels } from '@/helpers/enum/w-navigation'

export type Option = {
  authed: boolean
  name: Names
  label: Labels
  type: Types
}
