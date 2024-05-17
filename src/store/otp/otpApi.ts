import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { OtpSendRequest, OtpVerifyRequest, OtpResponse } from '@/types/auth/otp.type'

export const otpApi = createApi({
  reducerPath: 'otpApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5215/api/one-time-verification' }),
  endpoints: (builder) => ({
    sendOtp: builder.mutation<OtpResponse, OtpSendRequest>({
      query: (body) => ({
        url: '/send',
        method: 'POST',
        body,
      }),
    }),
    verifyOtp: builder.mutation<OtpResponse, OtpVerifyRequest>({
      query: (body) => ({
        url: '/verify',
        method: 'POST',
        body,
    }),
  }),
}),
})

export const {useSendOtpMutation, useVerifyOtpMutation} = otpApi