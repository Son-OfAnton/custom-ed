import { configureStore } from '@reduxjs/toolkit'
import { studentAuthApi } from './student/studentApi'
import { teacherAuthApi } from './teacher/teacherApi'
import { otpApi } from './otp/otpApi'
import dialogSlice from './features/dialogSlice'


export const store = configureStore({
  reducer: {
    [studentAuthApi.reducerPath]: studentAuthApi.reducer,
    [teacherAuthApi.reducerPath]: teacherAuthApi.reducer,
    [otpApi.reducerPath]: otpApi.reducer,
    dialog: dialogSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(studentAuthApi.middleware, 
      otpApi.middleware, 
      teacherAuthApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch