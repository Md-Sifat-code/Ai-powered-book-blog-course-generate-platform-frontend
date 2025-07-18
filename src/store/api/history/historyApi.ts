import { baseApi } from "../baseApi";

const historyApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getHistory: build.query({
            query: () => ({
                url: "/history",
                method: "GET",
                // params,
            }),
            // providesTags: ["History"],
        })
})

})

export const { useGetHistoryQuery } = historyApi;