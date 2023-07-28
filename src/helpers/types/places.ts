export type NewPlacesType = {
  name: string
  country: string
  state: string
  city: string
  street: string
  building: string
  uid: string
  date: string
}

export type PlacesType = NewPlacesType & {
  id: string
}

export type PlacesResponseType = {
  success: boolean
  places: PlacesType[]
}

export type PlaceUpdateType = {
  success: boolean
}
