import React from 'react'
import { DateTime } from 'luxon'
import { Post } from '../../types/post'
import { Header, TitleWrapper, HoverWrapper, TextWrapper, Days, Title, Location } from './index.styled'

interface Props {
  post: Post
}

export const PostHeader: React.FC<Props> = ({ post : { photo, location: { location }, date, title, titleColour } }: Props ): React.ReactElement => (
    <TitleWrapper
        style={{backgroundImage: `url(${photo})`}}
    >
        <Header>
            <HoverWrapper>
                <TextWrapper>
                    <Days $titleColour={titleColour}>{DateTime.fromJSDate(new Date(date)).toFormat("dd MMMM y")}</Days>
                    <Title $titleColour={titleColour}>{title}</Title>
                    <Location $titleColour={titleColour}>{location}</Location>
                </TextWrapper>
            </HoverWrapper>
        </Header>
    </TitleWrapper>
)

export default PostHeader