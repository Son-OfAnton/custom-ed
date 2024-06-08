import { 
  CreateAssessementResponse, 
  CreateAssessementRequest, 
  GetAssessmentResponse, 
  PublishAssessmentResponse, 
  Question,
  GetQuestionsResponse,
  PostSubmitAnswerResponse,
  PostSubmitAnswerRequest,
  CrossAssessmentResponse,
  SingleAssessmentAnalyticsResponse
} from "@/types/assessment/assessment.type";
import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const assessmentApi = createApi({
  reducerPath: 'assessmentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5040/api/classroom', 
    prepareHeaders: (headers) => {
    const token = JSON.parse(localStorage.getItem('currUser')!).token as string;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  }}),
  endpoints: (builder) => ({
    createAssessment: builder.mutation<CreateAssessementResponse, CreateAssessementRequest>({
      query: (body) => ({
        url: `/${body.classroomId}/assessment`,
        method: 'POST',
        body,
      })
    }),
    getAssessments: builder.query<GetAssessmentResponse, any>({
      query: (classroomId) => ({
        url: `/${classroomId}/assessment`,
        method: 'GET'
      })
    }),
    publishAssessment: builder.mutation<PublishAssessmentResponse, any>({
      query: ({classroomId, assessmentId}) => ({
        url: `/${classroomId}/assessment/publish/${assessmentId}`,
        method: 'PUT'
      }),
    }),
    addQuestion: builder.mutation<any, {classroomId: string, question: Question}>({
      query: ({classroomId, question}) => ({
        url: `/${classroomId}/assessment/add-question`,
        method: 'POST',
        body: question,
      })
    }),
    deleteQuestion: builder.mutation<any, {classroomId: string, questionId: string}>({
      query: ({classroomId, questionId}) => ({
        url: `/${classroomId}/assessment/question/${questionId}`,
        method: 'DELETE',
      })
    }),
    getQuestions: builder.query<GetQuestionsResponse, {classroomId: string, assessmentId: string}>({
      query: ({ classroomId, assessmentId }) => ({
        url: `/${classroomId}/assessment/${assessmentId}`,
        method: 'GET',
      })
    }),
    submitAssessment: builder.mutation<PostSubmitAnswerResponse, {body: PostSubmitAnswerRequest, classroomId: string}>({
      query: ({body, classroomId}) => ({
        url: `/${classroomId}/assessment/add-submission`,
        method: 'POST',
        body,
      })
    }),
    checkAnswer: builder.query<any, {classroomId: string, submissionId: string}>({
      query: ({classroomId, submissionId}) => ({
        url: `/${classroomId}/assessment/submission/${submissionId}`,
        method: 'GET',
      })
    }),
    crossAssessmentAnalytics: builder.query<CrossAssessmentResponse, string>({
      query: (classroomId) => ({
        url: `/${classroomId}/analytics/cross-assessment`,
        method: 'GET',
      })
    }),
    assessmentAnalyticsByTag: builder.query<CrossAssessmentResponse, {tags: string[], classroomId: string}>({
      query: ({tags, classroomId}) => ({
        url: `/${classroomId}/analytics/assessment`,
        method: 'POST',
        body: tags,
      })
    }),
    assessmentAnalyticsById: builder.query<SingleAssessmentAnalyticsResponse, {assessmentId: string, classroomId: string}>({
      query: ({assessmentId, classroomId}) => ({
        url: `/${classroomId}/analytics/assessment/${assessmentId}`,
        method: 'GET',
      })
    }),
  })
})


export const { 
  useCreateAssessmentMutation, 
  useGetAssessmentsQuery, 
  usePublishAssessmentMutation,
  useAddQuestionMutation,
  useDeleteQuestionMutation,
  useGetQuestionsQuery,
  useSubmitAssessmentMutation,
  useCheckAnswerQuery,
  useCrossAssessmentAnalyticsQuery,
  useAssessmentAnalyticsByTagQuery,
  useAssessmentAnalyticsByIdQuery,
} = assessmentApi;