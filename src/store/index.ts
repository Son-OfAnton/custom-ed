import { configureStore } from '@reduxjs/toolkit'
import { studentAuthApi } from './student/studentApi'
import { teacherAuthApi } from './teacher/teacherApi'
import { otpApi } from './otp/otpApi'
import dialogSlice from './features/dialogSlice'
import chatbotSlice from './features/chatbotSlice'
import { chatbotApi } from './chatbot/chatbotApi'


export const store = configureStore({
  reducer: {
    [studentAuthApi.reducerPath]: studentAuthApi.reducer,
    [teacherAuthApi.reducerPath]: teacherAuthApi.reducer,
    [otpApi.reducerPath]: otpApi.reducer,
    [chatbotApi.reducerPath]: chatbotApi.reducer,
    dialog: dialogSlice,
    chat: chatbotSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(studentAuthApi.middleware, 
      otpApi.middleware, 
      teacherAuthApi.middleware,
      chatbotApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch