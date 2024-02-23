import React, { FunctionComponent, useEffect } from 'react'
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { useLocation } from "react-router-dom";
import MapFC from './GoogleMap'
import Marker from './MapMarker'
import { MapI, MapLoaderI, Post } from '@/types';

import { Loading } from '..';

export const Map: FunctionComponent<MapI> = ({ posts, hoveredLocationKey, maps }: MapI): React.ReactElement | null => {
  const location = useLocation();

  let defaultCenter = {
    lat: 53.131857224360346,
    lng: -1.778172357903526,
  }
  const [zoom] = React.useState(posts.length > 0 ? null : 3);

  if (posts.length > 0) {
    defaultCenter = {
      lat: -6.709618,
      lng: -2.607743,
    }
  }

  const [bounds, setBounds] = React.useState<google.maps.LatLngBounds>(new maps.LatLngBounds());
  const [center, setCenter] = React.useState<google.maps.LatLngLiteral>(defaultCenter);

  const getMapBounds = () => {
    const bounds = new maps.LatLngBounds()	  

    posts.forEach((post: Post) => {	
      bounds.extend(new maps.LatLng(	
        post.location.lat,	
        post.location.lng,	
      ))	
    })

    return bounds	
  }

  useEffect(() => {
    // console.log("setBounds setCenter running")
    const currentBounds = getMapBounds();
    const centerInfo = currentBounds.getCenter();
    setBounds(currentBounds);
    setCenter({ lat: centerInfo.lat(), lng: centerInfo.lng()})
  }, [location, posts]);

  return (
    <MapFC
      center={center}
      zoom={zoom}
      bounds={bounds}
      posts={posts}
      style={{ flexGrow: "1", height: "100%" }}
    >
      {posts.map((post, i) => (
        <Marker key={i} 
          lat={post.location.lat}
          lng={post.location.lng}
          hovered={Boolean(i === hoveredLocationKey)}
          post={post} 
          />
      ))}
    </MapFC>
  )
}

const render = (status: Status, props: MapLoaderI) => {
  switch (status) {
    case Status.SUCCESS:
      return <Map {...props} maps={window?.google.maps} />;
    case Status.LOADING:
    default:
      return <Loading fade={true} />;
  }
};

export const MapLoader: FunctionComponent<MapLoaderI> = (props: MapLoaderI): React.ReactElement | null => {
  const GOOGLE_MAP_KEY = import.meta.env.VITE_GOOGLE_MAP_KEY;
  return (
    <Wrapper apiKey={GOOGLE_MAP_KEY} render={(status) => render(status, props)} />
  )
}

export default MapLoader;