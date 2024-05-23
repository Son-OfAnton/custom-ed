import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { StudentSignupResponse, StudentSignupRequest, StudentSigninResponse, StudentSigninRequest } from '@/types/auth/studentAuth.type'
import { EditStudentProfileRequest, GetSingleStudentResponse } from '@/types/student/student.type'

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
}),
})

export const { 
  useStudentSignupMutation, 
  useStudentSigninMutation, 
  useGetStudentByIdQuery, 
  useEditStudentProfileMutation } = studentAuthApi