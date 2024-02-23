export interface Photo {
  id?: number
  url: string
}

export interface SavePhoto extends Photo {
  postId: number
}