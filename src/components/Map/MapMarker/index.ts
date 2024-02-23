import React, { useState, useEffect } from 'react'
import createHTMLMapMarker from './createHTMLMapMarker';
import { Post } from '@/types';

interface MarkerProps extends google.maps.MarkerOptions {
  post: Post
  lat: number
  lng: number
  hovered: boolean
}

const Marker: React.FC<MarkerProps> = ({ post, lat, lng, hovered, ...options }) => {
  const [marker, setMarker] = useState<google.maps.Marker | any>(); // TODO fix type

  useEffect(() => {
    if (!marker) {

      const hoveredClass = hovered ? 'hovered' : ''; // TODO fix css class

      const marker = createHTMLMapMarker({
        latlng: new google.maps.LatLng(lat, lng),
        html: `<div class="${hoveredClass} map-marker"><img class="${hoveredClass} map-marker-icon" src="${post.photo}"></div>`
      });

      setMarker(marker);
    }

    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker, hovered]); // TODO fix list

  useEffect(() => {
    if (marker) {
      marker.setMap(null);
      setMarker(null);
    }
  }, [hovered]); // TODO fix list

  useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);

  return null;
};


export default Marker;