import { baseApi } from "../baseApi";

const blogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    generateBlog: build.mutation({
      query: (prompt) => {
        return {
          url: "/blog/generate",
          method: "POST",
          body: prompt,
        };
      },
    }),
    getSingleBlog: build.query({
      query: (id) => {
        return {
          url: `/history/${id}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGenerateBlogMutation, useGetSingleBlogQuery } = blogApi;
