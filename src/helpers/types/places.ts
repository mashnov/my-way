export type PlacesType = {
  country: string
  city: string
  uid: string
  id: string
}

export type PlacesResponseType = {
  success: boolean
  places: PlacesType[]
}
