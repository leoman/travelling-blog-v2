import { Post, PostResponse, PostsResponse } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiName = 'posts';
// const fetchPostTag = 'Post';

const postsApi = createApi({
  reducerPath: apiName,
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL
  }),
  endpoints(builder) {
    return {
      fetchPosts: builder.query({
        // providesTags: (result, error, id) => {
        //   const tags = result.map((Post: Post) => ({
        //     type: fetchPostTag,
        //     id: Post.id
        //   }));
        //   tags.push({
        //     type: fetchPostTag,
        //     id
        //   });
        //   return tags;
        // },
        query: (tripSlug) => {
          return {
            url: apiName,
            method: 'GET',
            params: {
              trip: tripSlug,
              status: 'live'
            }
          }
        },
        transformResponse: (response: PostsResponse) => {
          return response.result
        }
      }),
      fetchPost: builder.query({
        // providesTags: (result, error, id) => {
        //   const tags = result.map((Post: Post) => ({
        //     type: fetchPostTag,
        //     id: Post.id
        //   }));
        //   tags.push({
        //     type: fetchPostTag,
        //     id
        //   });
        //   return tags;
        // },
        query: (slug: string) => {
          return {
            url: `/${apiName}/${slug}`,
            method: 'GET',
          }
        },
        transformResponse: (response: PostResponse) => {
          return response.result
        }
      }),
      addPost: builder.mutation({
        // invalidatesTags: (result, error, id) => {
        //   return [
        //     {
        //       type: fetchPostTag,
        //       id
        //     }
        //   ];
        // },
        query: (Post: Post) => {
          return {
            url: apiName,
            method: 'POST',
            body: {
              ...Post
            }
          }
        }
      }),
      removePost: builder.mutation({
        // invalidatesTags: (result, error, album) => {
        //   return [
        //     {
        //       type: fetchAlbumTag,
        //       id: album.id
        //     }
        //   ];
        // },
        query: (Post: Post) => {
          return {
            url: `/${apiName}/${Post.id}`,
            method: 'DELETE',
          };
        },
      }),
    };
  },
})

export const { useLazyFetchPostsQuery, useFetchPostsQuery, useFetchPostQuery, useAddPostMutation, useRemovePostMutation } = postsApi;
export { postsApi }