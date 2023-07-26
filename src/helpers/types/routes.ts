export type RoutesType = {
  from: string
  to: string
  uid: string
}

export type RoutesResponseType = {
  success: boolean
  routes: RoutesType[]
}
