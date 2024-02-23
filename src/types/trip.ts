import { Response } from './index';

export enum TripStatus {
  live = "live",
  draft = "draft"
}

export interface Trip {
  id?: number
  name: string
  slug: string
  status: string
}

export interface GetTrips extends Response<Trip[]> {
  result: Trip[]
}

export const tripInitialState: Trip = {
  name: '',
  slug: '',
  status: TripStatus.draft
}