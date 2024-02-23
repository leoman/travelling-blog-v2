
import { Post, PostParams } from "@/types";
import { RootState } from "..";

export const getPostsSelector = (state: RootState) => state.posts;

export const getPostSelector = (state: RootState, { slug, trip }: PostParams): Post | undefined => {
  const posts = getPostsSelector(state);
  const query = `fetchPosts("${trip}")`;

  if (posts.queries[query]) {
    const postsArray = posts.queries[query]?.data as Post[]
    return postsArray.find((post: Post) => post.slug === slug)
  }
  return undefined
};
