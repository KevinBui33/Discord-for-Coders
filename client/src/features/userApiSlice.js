import { apiSlice } from "../api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (type) => `friends?type=${type}`,
      providesTags: ["Friends"],
    }),
    getUserInfo: builder.query({
      query: () => `user`,
      providesTags: ["User"],
    }),
    changeFriendStatus: builder.mutation({
      query: (data) => ({
        url: "friend",
        method: "POST",
        body: { ...data },
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserInfoQuery,
  useChangeFriendStatusMutation,
} = userApiSlice;
