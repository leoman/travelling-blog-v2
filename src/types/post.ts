import { DateTime } from 'luxon'
import { Location } from './location'
import { Photo } from './photo'
import { Trip } from './trip'
import { Response } from './'

export enum Status {
  live = "live",
  draft = "draft"
}

export interface Post {
  id?: number
  trip: Trip
  title: string
  slug: string
  titleColour: string
  content: string
  date: Date
  order: Date
  photo: string
  status: Status
  location: Location
  photos?: Photo[]
}

export interface GeoPost extends Post {
  y: number
  x: number
}

export const initialState: Post = {
  trip: {
    name: '',
    slug: '',
    status: ''
  },
  title: '',
  slug: '',
  titleColour: '',
  content: '',
  photo: '',
  date: new Date(),
  order: DateTime.fromJSDate(new Date()).toJSDate(),
  status: Status.draft,
  location: { 
      location: '',
      duration: 0,
      lat: 0, 
      lng: 0,
      hideFromBounding: false,
  },
  photos: [],
}

export interface PostsResponse extends Response<Post[]> {
  result: Post[]
}

export interface PostResponse extends Response<Post> {
  result: Post
}

export type PostParams = { trip: string; slug: string }