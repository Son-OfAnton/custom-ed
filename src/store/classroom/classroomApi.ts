import { 
  AddBatchRequest, 
  AddBatchResponse, 
  CreateClassroomRequest, 
  CreateClassroomResponse, 
  GetClassroomByIdResponse, 
  SearchClassroomResponse, 
  StudentClassroomResponse, 
  TeacherClassroomResponse 
} from "@/types/classroom/classroom.type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const classroomApi = createApi({
  reducerPath: 'classroomApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://customed-classroom-service.onrender.com/api/classroom', 
    prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');
      if (token) {
       
        headers.set('authorization', `Bearer ${token}`)
        console.log(headers)
      }
      return headers
    }
  }),
  endpoints: (builder) => ({
    createClassRoom: builder.mutation<CreateClassroomResponse, CreateClassroomRequest>({
      query: (body) => ({
        url: '/',
        method: 'POST',
        body,
      })
    }),
    editClassroom: builder.mutation({
      query: (body) => ({
        url: '/',
        method: 'PUT',
        body,
      })
    }),
    addBatch: builder.mutation<AddBatchResponse, AddBatchRequest>({
      query: (body) => ({
        url: '/add-batch',
        method: 'POST',
        body,
      })
    }),
    studentClassroom: builder.query<StudentClassroomResponse, void>({
      query: () => ({
        url: '/classrooms/student',
        method: 'GET',
      })
    }),
    teacherClassroom: builder.query<TeacherClassroomResponse, void>({
      query: () => ({
        url: '/classrooms/teacher',
        method: 'GET',
      })
    }),
    getClassroomById: builder.query<GetClassroomByIdResponse, any>({
      query: (id) => ({
        url: `/${id}`,
        method: 'GET'
      })
    }),
    deleteClassroom: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      })
    }),
    searchClassroom: builder.query<SearchClassroomResponse, any>({
      query: (query) => ({
        url: '/search',
        method: 'GET',
        params: { query },
      })
    }),
    addStudent: builder.mutation({
      query: ({ studentId, classroomId }) => ({
        url: '/add-student',
        method: 'POST',
        params: { studentId, classroomId }
      })
    }),
    removeStudent: builder.mutation({
      query: ({ studentId, classroomId }) => ({
        url: '/remove-student',
        method: 'DELETE',
        params: { studentId, classroomId }
      })
    })
  })
})

export const { 
  useCreateClassRoomMutation, 
  useEditClassroomMutation, 
  useAddBatchMutation, 
  useStudentClassroomQuery, 
  useTeacherClassroomQuery, 
  useGetClassroomByIdQuery, 
  useDeleteClassroomMutation, 
  useSearchClassroomQuery, 
  useAddStudentMutation, 
  useRemoveStudentMutation,
} = classroomApi