import { Post } from './post';
import { Trip } from './trip';
export * from './location';
export * from './login';
export * from './photo';
export * from './post';
export * from './trip';

export interface LocationListI {
  listItemHovered(hoveredLocationKey: number): void;
  posts: Post[]
  tripSlug: Trip["slug"];
}

export interface LocationPanelI {
  i: number;
  listItemHovered(hoveredLocationKey: null | number): void;
  post: Post;
  tripSlug: Trip["slug"];
}

export interface MapLoaderI {
  posts: Post[]
  hoveredLocationKey: number | null
  slug?: string
}

export interface MapI extends MapLoaderI {
  maps: typeof google.maps
}

export interface MapMarkersI {
  map: google.maps.Map
  posts: Post[]
  projection: google.maps.MapCanvasProjection
  hoveredLocationKey: number | null
}

export interface MapMarkerI {
  post: Post
  lat: number
  lng: number
  hovered: boolean
}

export interface Response<R> {
  code: number
  message: string
  result: R
}