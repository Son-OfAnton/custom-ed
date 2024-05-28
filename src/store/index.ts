import { configureStore } from '@reduxjs/toolkit'
import { studentAuthApi } from './student/studentApi'
import { teacherAuthApi } from './teacher/teacherApi'




export const store = configureStore({
  reducer: {
    [studentAuthApi.reducerPath]: studentAuthApi.reducer,
    [teacherAuthApi.reducerPath]: teacherAuthApi.reducer,
   
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(studentAuthApi.middleware, 
      teacherAuthApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch