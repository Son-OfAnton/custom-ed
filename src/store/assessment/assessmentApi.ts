import { 
  CreateAssessementResponse, 
  CreateAssessementRequest, 
  GetAssessmentResponse, 
  PublishAssessmentResponse 
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
        method: 'POST'
      })
  })
})
})

export const { 
  useCreateAssessmentMutation, 
  useGetAssessmentsQuery, 
  usePublishAssessmentMutation 
} = assessmentApi;