import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TeacherSignupRequest, TeacherSignupResponse } from '@/types/auth/teacherAuth.type'
import {  VerifyOtpRequest, VerifyOtpResponse, SendOtpForForgotPasswordResponse, SendOtpForForgotPasswordRequest } from '@/types/auth/verifyOtp.type'
import {getProfileByIdResponse, getProfileByIdRequest, updateProfileFieldResponse,updateProfileFieldRequest, getPictureResponse,changePasswordRequest, changePasswordResponse} from "@/types/auth/profile.type"
export const teacherAuthApi = createApi({
  reducerPath: 'teacherAuthApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://customed-user-service.onrender.com/api/user/teacher' }),
  endpoints: (builder) => ({
    teacherSignup: builder.mutation<TeacherSignupResponse, TeacherSignupRequest>({
      query: (body) => ({
        url: '',
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
  teacherVerifyOtp: builder.mutation<VerifyOtpResponse, VerifyOtpRequest>({
      query: (body) => ({
        url: '/verify',
        method: 'POST',
        body,
    }),
  }),
  teacherSendOtpForForgotPassword: builder.mutation<SendOtpForForgotPasswordResponse, SendOtpForForgotPasswordRequest>({
      query: (body) => ({
        url: '/sendOtpForForgotPassword',
        method: 'POST',
        body,
    }),
  }),
  teacherVerifyOtpForForgotPassword: builder.mutation<VerifyOtpResponse, VerifyOtpRequest>({
      query: (body) => ({
        url: '/verifyOtpForForgotPassword',
        method: 'POST',
        body,
    }),
  }),
  teacherGetProfileById: builder.query<getProfileByIdResponse, getProfileByIdRequest>({
      query: (body) => ({
        url: '/{id}',
        method: 'GET',
        body,
    }),
  }),
  teacherGetPictureById: builder.query<getProfileByIdResponse, getProfileByIdRequest>({
      query: (body) => ({
        url: 'getPicture/${userId}',
        method: 'GET',
        body,
    }),
  }),
  teacherUpdatePhoneNumber: builder.mutation<updateProfileFieldResponse,updateProfileFieldRequest>({
      query: (body) => ({
        url: '/',
        method: 'PUT',
        body,
      }),
    }),
     changeTeacherPassword: builder.mutation<changePasswordResponse,changePasswordRequest>({
      query: (body) => ({
        url: '/changePassword',
        method: 'PUT',
        body,
      }),
    }),
}),
})

export const { useTeacherSignupMutation, useTeacherSigninMutation, useTeacherVerifyOtpMutation, useTeacherSendOtpForForgotPasswordMutation, useTeacherVerifyOtpForForgotPasswordMutation, useTeacherGetProfileByIdQuery, useTeacherGetPictureByIdQuery, useTeacherUpdatePhoneNumberMutation, useChangeTeacherPasswordMutation} = teacherAuthApi