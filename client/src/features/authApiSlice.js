const { apiSlice } = require("../api/apiSlice");

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credential) => ({
        url: "/auth",
        method: "POST",
        body: { ...credential },
      }),
    }),
  }),
});
