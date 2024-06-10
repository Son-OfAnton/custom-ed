import { configureStore } from '@reduxjs/toolkit'
import { studentAuthApi } from './student/studentApi'
import { teacherAuthApi } from './teacher/teacherApi'
import { classroomApi } from './classroom/classroomApi'
import chatbotSlice from './features/chatbotSlice'
import classroomSlice from './features/classroomSlice'

export const store = configureStore({
  reducer: {
    [studentAuthApi.reducerPath]: studentAuthApi.reducer,
    [teacherAuthApi.reducerPath]: teacherAuthApi.reducer,
    [classroomApi.reducerPath]: classroomApi.reducer,
    chat: chatbotSlice,
    classroom: classroomSlice,

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(studentAuthApi.middleware, 
      teacherAuthApi.middleware, classroomApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch