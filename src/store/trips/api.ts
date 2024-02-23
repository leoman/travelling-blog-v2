import { Trip, GetTrips } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiName = 'trips';
// const fetchTripTag = 'Trip';

type TripResponse = GetTrips

const tripsApi = createApi({
  reducerPath: apiName,
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  endpoints(builder) {
    return {
      fetchTrips: builder.query<Trip[], void>({
        // providesTags: (result) => {
        //   if (result) {
        //     return result.map((trip) => ({
        //       type: fetchTripTag,
        //       id: trip.id
        //     }));
        //   }
        //   return [];
        // },
        query: () => {
          return {
            url: apiName,
            method: 'GET',
            params: {
              live: true,
            }
          }
        },
        transformResponse: (response: TripResponse) => {
          return response.result
        }
      }),
      addTrip: builder.mutation({
        // invalidatesTags: (result, error, id) => {
        //   return [
        //     {
        //       type: fetchTripTag,
        //       id
        //     }
        //   ];
        // },
        query: (trip: Trip) => {
          return {
            url: apiName,
            method: 'POST',
            body: {
              ...trip
            }
          }
        }
      }),
      removeTrip: builder.mutation({
        // invalidatesTags: (result, error, album) => {
        //   return [
        //     {
        //       type: fetchAlbumTag,
        //       id: album.id
        //     }
        //   ];
        // },
        query: (trip: Trip) => {
          return {
            url: `/${apiName}/${trip.id}`,
            method: 'DELETE',
          };
        },
      }),
    };
  },
})

export const { useFetchTripsQuery, useAddTripMutation, useRemoveTripMutation } = tripsApi;
export { tripsApi }