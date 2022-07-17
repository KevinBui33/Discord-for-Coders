import { apiSlice } from "../api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (type) => `friends?type=${type}`,
    }),
  }),
});

export const { useGetUsersQuery } = userApiSlice;
