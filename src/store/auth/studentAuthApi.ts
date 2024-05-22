import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { StudentSignupRequest, StudentSignupResponse } from '@/types/auth/studentAuth.type'

export const studentAuthApi = createApi({
  reducerPath: 'studentAuthApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://customed-user-service.onrender.com/api/user/student' }),
  endpoints: (builder) => ({
    studentSignup: builder.mutation<StudentSignupResponse,StudentSignupRequest>({
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