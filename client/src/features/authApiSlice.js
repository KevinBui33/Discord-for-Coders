const { apiSlice } = require("../api/apiSlice");

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Login in endpoint
    login: builder.mutation({
      query: (credential) => ({
        url: "/login",
        method: "POST",
        body: { ...credential },
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: { ...data },
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApiSlice;
