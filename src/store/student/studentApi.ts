import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { StudentSignupResponse, StudentSignupRequest, StudentSigninResponse, StudentSigninRequest } from '@/types/auth/studentAuth.type'
import { EditStudentProfileRequest, GetSingleStudentResponse } from '@/types/student/student.type'
import { url } from 'inspector';

export const studentAuthApi = createApi({
  reducerPath: 'studentAuthApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5099/api/user/student' }),
  endpoints: (builder) => ({
    studentSignup: builder.mutation<StudentSignupResponse, StudentSignupRequest>({
      query: (body) => ({
        url: '/',
        method: 'POST',
        body,
      }),
    }),
    studentSignin: builder.mutation<StudentSigninResponse, StudentSigninRequest>({
      query: (body) => ({
        url: '/login',
        method: 'POST',
        body,
      }),
    }),
    getStudentById: builder.query<GetSingleStudentResponse, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'GET'
      })
    }),
    aggregateGetStudentById: builder.query<GetSingleStudentResponse[], {studentIds: any[]}>({
      async queryFn({studentIds}, _queryApi, _extraOptions, fetchWithBQ) {
        const results = await Promise.all(studentIds.map(async (id, _) => {
          const response = await fetchWithBQ({
            url: `/${id}`,
            method: 'GET',
          });
          if (response.error) throw response.error;
          return response.data as GetSingleStudentResponse;
        }));
        return { data: results };
      }
    }),
    editStudentProfile: builder.mutation<any, EditStudentProfileRequest>({
      query: (body) => {
        const token = localStorage.getItem('currUser') ? JSON.parse(localStorage.getItem('currUser') as string).token : null;
    
        return {
          url: '/',
          method: 'PUT',
          body,
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
      },
    }),
    getProfilePic: builder.query({
      query: (studentId) => ({
        url: `/picture/${studentId}`,
        method: 'GET',
      })
    })
}),
})

export const { 
  useGetProfilePicQuery,
  useStudentSignupMutation, 
  useStudentSigninMutation, 
  useGetStudentByIdQuery, 
  useEditStudentProfileMutation,
  useAggregateGetStudentByIdQuery,
} = studentAuthApi