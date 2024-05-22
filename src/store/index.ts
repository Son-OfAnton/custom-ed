import { configureStore } from '@reduxjs/toolkit'
import { studentAuthApi } from './auth/studentAuthApi'
import { teacherAuthApi } from './auth/teacherAuthApi'
// import { otpApi } from './otp/otpApi'


export const store = configureStore({
  reducer: {
    [studentAuthApi.reducerPath]: studentAuthApi.reducer,
    [teacherAuthApi.reducerPath]: teacherAuthApi.reducer,
    // [otpApi.reducerPath]: otpApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(studentAuthApi.middleware, 
      // otpApi.middleware, 
      teacherAuthApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch