import { configureStore } from '@reduxjs/toolkit'
import { studentAuthApi } from './student/studentApi'
import { teacherAuthApi } from './teacher/teacherApi'
import { otpApi } from './otp/otpApi'
import dialogSlice from './features/dialogSlice'
import chatbotSlice from './features/chatbotSlice'
import classroomSlice from './features/classroomSlice'
import announcementDialogSlice from './features/announcementDialogSlice'
import { chatbotApi } from './chatbot/chatbotApi'
import { classroomApi } from './classroom/classroomApi'
import { announcementApi } from './announcement/announcementApi'
import announcementSlice from './features/announcementSlice'
import assessmentDialogSlice from './features/assessmentDialogSlice'
import { assessmentApi } from './assessment/assessmentApi'
import classroomDialogSlice from './features/classroomDialogSlice'
import assessmentSlice from './features/assessmentSlice'
import discussionSlice from './features/discussionSlice'

export const store = configureStore({
  reducer: {
    [studentAuthApi.reducerPath]: studentAuthApi.reducer,
    [teacherAuthApi.reducerPath]: teacherAuthApi.reducer,
    [otpApi.reducerPath]: otpApi.reducer,
    [chatbotApi.reducerPath]: chatbotApi.reducer,
    [classroomApi.reducerPath]: classroomApi.reducer,
    [announcementApi.reducerPath]: announcementApi.reducer,
    [assessmentApi.reducerPath]: assessmentApi.reducer,
    dialog: dialogSlice,
    chat: chatbotSlice,
    announcementDialog: announcementDialogSlice,
    classroom: classroomSlice,
    announcement: announcementSlice,
    assessment: assessmentSlice,
    assessmentDialog: assessmentDialogSlice,
    classroomDialog: classroomDialogSlice,
    discussion: discussionSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(studentAuthApi.middleware, 
      otpApi.middleware, 
      teacherAuthApi.middleware,
      chatbotApi.middleware,
      classroomApi.middleware,
      announcementApi.middleware,
      assessmentApi.middleware,
      ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch