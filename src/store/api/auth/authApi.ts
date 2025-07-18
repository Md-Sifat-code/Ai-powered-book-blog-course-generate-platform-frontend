// import { baseApi } from "../../api/baseApi";

// import { t } from "node_modules/framer-motion/dist/types.d-CtuPurYT";
import { baseApi } from "../baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    loginUser: build.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      // invalidatesTags: ["User"],
    }),
    changePassword: build.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
    }),
    forgetPassword: build.mutation({
      query: (email) => ({
        url: "/auth/forget-password",
        method: "POST",
        body: { email },
      }),
    }),
    resetPassword: build.mutation({
      query: (data) => ({
        url: `/auth/reset-password`,
        method: "POST",
        body: data,
      }),
    }),
    // resetPassword: build.mutation({
  }),
});

export const {
  useLoginUserMutation,
  useChangePasswordMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation
} = authApi;
