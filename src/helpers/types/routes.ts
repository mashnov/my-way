export type RoutesType = {
  name: string
  date: string
  from: string
  to: string
  uid: string
  id: string
}

export type RoutesResponseType = {
  success: boolean
  routes: RoutesType[]
}
