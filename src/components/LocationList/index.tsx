import React from 'react'
import { LocationListI, Post } from '@/types';
import { LocationPanel } from '..';


export const LocationList = ({ posts, listItemHovered, tripSlug }: LocationListI) => {
  return posts.filter((post: Post) => !post.location.hideFromBounding).map((post: Post, i: number) => (
    <LocationPanel key={i.toString()} i={i} post={post} listItemHovered={listItemHovered} tripSlug={tripSlug} />
  ))
}