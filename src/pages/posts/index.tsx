import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Footer, Loading, PostContent, PostHeader, ScrollProgress, ScrollTop } from '../../components';
import { PostViewWrapper, ContentWrapper } from './index.styled';
import { useFetchPostQuery, useGetPost } from '../../store';
import { Post, PostParams } from '@/types';

declare global {
  interface Window {
    FB: {
      XFBML: {
        parse(): void
      }
    }
  }
}

export const PostPage: React.FC = () => {
  const [ fade, setFade ] = useState<boolean>(false)
  const [ show, setShow ] = useState<boolean>(false)
  const { trip, slug } = useParams<PostParams>();

  let post: Post | null | undefined;

  post = useGetPost({ slug, trip} as PostParams);

  const { data, isFetching, error } = useFetchPostQuery(slug as string, {
    skip: Boolean(post)
  });

  if (data) {
    post = data;
  }

  useEffect(() => {
    if (!isFetching) {
      setFade(true)
      // setTimeout(() => window.FB.XFBML.parse(), 2000);
    }
    if (fade && !error) {
      setTimeout(() => setShow(true), 500)
    }
  }, [isFetching, fade, error])

  if (isFetching || !show || error) return <Loading fade={fade} />;

  console.log("isFetching slug post", isFetching, slug, (!post || !slug), post);

  if (!post || !slug || !trip) return null;

  const { content, photos = [] } = post

  return (
    <PostViewWrapper>

      <ScrollProgress />
      <ScrollTop />

      <PostHeader post={post} />

      <ContentWrapper>
        <PostContent content={content} photos={photos} title={post.title} slug={trip} />
      </ContentWrapper>

      {/* <FacebookComments className="fb-comments" data-href={`http://kirstyandpete.com/posts/${slug}`} data-width="100%" data-numposts="5"></FacebookComments> */}
      <Footer />

    </PostViewWrapper>
  );
}
