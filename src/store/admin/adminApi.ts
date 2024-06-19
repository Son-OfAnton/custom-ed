import { AdminSigninRequest, AdminSigninResponse } from "@/types/admin";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5099/api/user/admin" }),
  
  endpoints: (builder) => ({
    adminSignin: builder.mutation<AdminSigninResponse, AdminSigninRequest>({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
    }),
    emailTeacher: builder.mutation({
      query: (body) => {
        const token = localStorage.getItem('currUser') ? JSON.parse(localStorage.getItem('currUser') as string).token : null;
        
        return {
          url: "/email-teacher",
          method: "POST",
          body,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      }
    }),
  }),
});


export const { useAdminSigninMutation, useEmailTeacherMutation } = adminApi;