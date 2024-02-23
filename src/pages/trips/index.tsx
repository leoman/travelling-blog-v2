import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { MapViewWrapper, MapWrapper, ListWrapper, NavigationToggle, TitleWrapper, Title } from './index.styled';
import { Trip } from '@/types';
import { Loading, LocationList, MapLoader as Map, ScrollTop, TripSelection } from '../../components';
import { useFetchPostsQuery } from '../../store';

interface Props {
  trips: Trip[]
}

export const TripsPage: React.FC<Props> = ({ trips }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [ hoveredLocationKey, setHoveredLocationKey ] = useState<null | number>(null)
  const [ fade, setFade ] = useState<boolean>(false)
  const [ show, setShow ] = useState<boolean>(false)
  const [ navigationShown, setNavigationShown ] = useState<boolean>(true);

  const skipFetch = Boolean(slug);
  
  const { data: posts = [], isFetching, error } = useFetchPostsQuery(slug, { skip: !skipFetch });

  const listItemHovered = (hoveredLocationKey: number): void => setHoveredLocationKey(hoveredLocationKey)

  const toggleNavigation = (navigationShown: boolean): void => setNavigationShown(!navigationShown)

  const changeTrip = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    navigate(`/${event.target.value}`);
  }

  const listRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setFade(false)
    setShow(false)
    setTimeout(() => setShow(true), 500)
  }, [location])

  if (isFetching || !show || error) return <Loading fade={fade} />;

  return (
    <MapViewWrapper>
      <TitleWrapper>
        <Title $navigation={false}>
          Kirsty and Pete&apos;s Travel Adventure
        </Title>
      </TitleWrapper>
      <MapWrapper $navigationShown={navigationShown}>
        <NavigationToggle onClick={() => toggleNavigation(navigationShown)} />
        <Map posts={posts} hoveredLocationKey={hoveredLocationKey} slug={slug}  />
      </MapWrapper>
      <ListWrapper $navigationShown={navigationShown} ref={listRef}>
        <ScrollTop ref={listRef} $light={true} />
        <Title $navigation>
          Kirsty and Pete&apos;s Travel Adventure
        </Title>
        <TripSelection changeTrip={changeTrip} trips={trips} slug={slug} />
        <LocationList tripSlug={slug as string} posts={posts} listItemHovered={listItemHovered} />
      </ListWrapper>
    </MapViewWrapper>
  )
}
