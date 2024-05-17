import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { StudentSignupResponse, StudentSignupRequest } from '@/types/auth/studentAuth.type'

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
    studentSignin: builder.mutation({
      query: (body) => ({
        url: '/login',
        method: 'POST',
        body,
    }),
  }),
}),
})

export const { useStudentSignupMutation, useStudentSigninMutation } = studentAuthApi