const { apiSlice } = require("../api/apiSlice");

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Login in endpoint
    login: builder.mutation({
      query: (credential) => ({
        url: "/auth",
        method: "POST",
        body: { ...credential },
      }),
    }),
  }),
});

export const { useLoginMutation } = authApiSlice;
