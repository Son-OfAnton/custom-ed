import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TeacherSignupRequest, TeacherSignupResponse } from '@/types/auth/teacherAuth.type'

export const teacherAuthApi = createApi({
  reducerPath: 'teacherAuthApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://customed-user-service.onrender.com/' }),
  endpoints: (builder) => ({
    teacherSignup: builder.mutation<TeacherSignupResponse, TeacherSignupRequest>({
      query: (body) => ({
        url: 'api/user/teacher',
        method: 'POST',
        body,
      }),
    }),
    teacherSignin: builder.mutation({
      query: (body) => ({
        url: 'api/user/teacher/login',
        method: 'POST',
        body,
    }),
  }),
}),
})

export const { useTeacherSignupMutation, useTeacherSigninMutation } = teacherAuthApi