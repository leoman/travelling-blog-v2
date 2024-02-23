import React from 'react';
import { PanelWrapper, ImagePane, HoverPanel, Title } from './index.styled';
import { LocationPanelI } from '@/types';

export const LocationPanel = ({ post: { title, photo, slug }, tripSlug, listItemHovered, i }: LocationPanelI): JSX.Element => (
    <PanelWrapper to={`/${tripSlug}/posts/${slug}`} onMouseEnter={() => listItemHovered(i)} onMouseLeave={() => listItemHovered(null)} >
        <ImagePane src={photo} />
        <HoverPanel>
            <Title>{title}</Title>
        </HoverPanel>
    </PanelWrapper>
);

export default LocationPanel