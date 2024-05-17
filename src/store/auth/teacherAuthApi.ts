import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TeacherSignupRequest, TeacherSignupResponse } from '@/types/auth/teacherAuth.type'

export const teacherAuthApi = createApi({
  reducerPath: 'teacherAuthApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5099/api/user/teacher' }),
  endpoints: (builder) => ({
    teacherSignup: builder.mutation<TeacherSignupResponse, TeacherSignupRequest>({
      query: (body) => ({
        url: '/',
        method: 'POST',
        body,
      }),
    }),
    teacherSignin: builder.mutation({
      query: (body) => ({
        url: '/login',
        method: 'POST',
        body,
    }),
  }),
}),
})

export const { useTeacherSignupMutation, useTeacherSigninMutation } = teacherAuthApi