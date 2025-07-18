import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://31.97.139.84/api",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.user?.accessToken || "";
      //   console.log({ token });
      if (token) {
        console.log({ token });
        headers.set("Authorization", `${token}`);
      }

      return headers;
    },
  }),
  endpoints: () => ({}),
});
