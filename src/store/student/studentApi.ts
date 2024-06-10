import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { StudentSignupRequest, StudentSignupResponse } from '@/types/auth/studentAuth.type'
import {  VerifyOtpRequest, VerifyOtpResponse, SendOtpForForgotPasswordResponse, SendOtpForForgotPasswordRequest } from '@/types/auth/verifyOtp.type'
import {getProfileByIdResponse, getProfileByNameRequest, getProfileByIdRequest, updateProfileFieldResponse, updateProfileFieldRequest, getPictureResponse,changePasswordRequest, getPictureRequest, changePasswordResponse, uploadImageRequest,uploadImageResponse } from "@/types/auth/profile.type"
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
   studentVerifyOtp: builder.mutation<VerifyOtpResponse, VerifyOtpRequest>({
      query: (body) => ({
        url: '/verify',
        method: 'POST',
        body,
    }),
  }),
   studentSendOtpForForgotPassword: builder.mutation<SendOtpForForgotPasswordResponse, SendOtpForForgotPasswordRequest>({
      query: (body) => ({
        url: '/sendOtpForForgotPassword',
        method: 'POST',
        body,
    }),
  }),
  studentVerifyOtpForForgotPassword: builder.mutation<VerifyOtpResponse, VerifyOtpRequest>({
      query: (body) => ({
        url: '/verifyOtpForForgotPassword',
        method: 'POST',
        body,
    }),
  }),
  studentGetProfileById: builder.query<getProfileByIdResponse, getProfileByIdRequest>({
      query: ({ id }: getProfileByIdRequest) => ({
        url: `/${id}`,
        method: 'GET',
    }),
  }),
   studentGetProfileByName: builder.query<getProfileByIdResponse, getProfileByNameRequest>({
      query: (name: getProfileByNameRequest ) => ({
        url: `/student-name`,
        method: 'GET',
    }),
  }),
 studentGetPictureById: builder.query<getPictureResponse, getPictureRequest>({
  query: ({ id }: getPictureRequest) => ({
    url: `getPicture/${id}`,
    method: 'GET',
    
  }),
}),
  studentUpdatePhoneNumber: builder.mutation<updateProfileFieldResponse,updateProfileFieldRequest>({
      query: (body) => ({
        url: '/updatePhoneAndDepartment',
        method: 'PUT',
        body,
      }),
    }),
    changePassword: builder.mutation<changePasswordResponse,changePasswordRequest>({
      query: (body) => ({
        url: '/changePassword',
        method: 'PUT',
        body,
      }),
    }),
     uploadImageStudent: builder.mutation<uploadImageResponse, uploadImageRequest>({
      query: (body) => ({
        url: '/uploadImage',
        method: 'POST',
        body,
      }),
    }),
}),
})

export const { useStudentSignupMutation, useStudentSigninMutation, useStudentVerifyOtpMutation, useStudentSendOtpForForgotPasswordMutation, useStudentVerifyOtpForForgotPasswordMutation, useStudentGetProfileByIdQuery, useStudentGetPictureByIdQuery, useStudentUpdatePhoneNumberMutation, useChangePasswordMutation, useUploadImageStudentMutation, useStudentGetProfileByNameQuery} = studentAuthApi