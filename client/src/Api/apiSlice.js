import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logout } from "../features/authSlice";
const baseURL = "http://localhost:5000";

// For every request, set bearer token with current token
const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token || localStorage.getItem("token");
    console.log(token);
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// If token has experied get a new one
const baseQueryWithReAuth = async (args, api, extraOptions) => {
  console.log("calling base query with auth");
  let result = await baseQuery(args, api, extraOptions);

  // Refresh token is invalid and need to get a new one
  if (result?.error?.originalStatus === 403) {
    console.log("You got a 403 error");
    console.log("sending refresh token");

    // Get new refresh token
    let refreshResult = await baseQuery("/refresh", api, extraOptions);
    console.log(refreshResult);

    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      // Set new access token
      api.dispatch(setCredentials({ ...refreshResult.data, user }));
      // retry query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({}),
});
