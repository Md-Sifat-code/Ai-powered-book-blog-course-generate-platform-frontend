import { baseApi } from "../baseApi";

const bookApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBook: build.mutation({
      query: (book) => {
        console.log({ book });
        return {
          url: "/book/generate",
          method: "POST",
          body: book,
        };
      },
    }),
  }),
});

export const { useCreateBookMutation } = bookApi;
