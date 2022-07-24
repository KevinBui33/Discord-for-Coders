import { apiSlice } from "../api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (type) => `friends?type=${type}`,
    }),
    getUserInfo: builder.query({
      query: () => `user`,
    }),
  }),
});

export const { useGetUsersQuery, useGetUserInfoQuery } = userApiSlice;
