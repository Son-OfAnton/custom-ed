import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chatbotApi = createApi({
  reducerPath: "chatbotApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000" }),
  endpoints: (builder) => ({
    greet: builder.mutation({
      query: (body) => ({
        url: `/greet`,
        method: "POST",
        body,
      }),
    }),
    detail: builder.mutation({
      query: (body) => ({
        url: `/detail`,
        method: "POST",
        body,
      }),
    }),
    generate: builder.mutation({
      query: (body) => ({
        url: `/generate`,
        method: "POST",
        body,
      }),
    }),
    save: builder.mutation({
      query: (body) => ({
        url: `/save`,
        method: "POST",
        body,
      }),
    }),
    getAllLearningPaths: builder.query({
      query: (body) => ({
        url: `/learning-paths`,
        method: "GET",
        body,
      }),
    }),
    getLearningPath: builder.query({
      query: ({ studentId, learningPathId }) => ({
        url: `/learning-paths/${learningPathId}`,
        method: "GET",
        body: JSON.stringify({ "studentId": studentId }),
      }),
    }),
    deleteLearningPath: builder.mutation({
      query: ({ studentId, learningPathId }) => ({
        url: `/learning-paths/${learningPathId}`,
        method: "DELETE",
        body: JSON.stringify({ "studentId": studentId})
      }),
    }),
  }),
});

export const {
  useGreetMutation, 
  useDetailMutation, 
  useGenerateMutation, 
  useSaveMutation,
  useGetAllLearningPathsQuery, 
  useGetLearningPathQuery,
  useDeleteLearningPathMutation, 
} = chatbotApi

