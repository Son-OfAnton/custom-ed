import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { 
  CreateMessageRequest, 
  CreateMessageResponse, 
  EditMessageRequest, 
  EditMessageResponse,
  DeleteMessageResponse
} from "@/types/discussion/discussion.type";

const discussionApi = createApi({
  reducerPath: "discussionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5082/api"
  }),
  endpoints: (builder) => ({
    createMessage: builder.mutation<CreateMessageResponse, CreateMessageRequest>({
      query: (body) => ({
        url: `/${body.classroomId}/forum/create-message`,
        method: 'POST',
        body,
      }),
    }),
    editMessage: builder.mutation<EditMessageResponse, EditMessageRequest>({
      query: (body) => ({
        url: `/${body.classroomId}/forum/update-message`,
        method: 'PUT',
        body,
      }) 
    }),
    deleteMessage: builder.mutation<DeleteMessageResponse, {classroomId: string, messageId: string}>({
      query: ({classroomId, messageId}) => ({
        url: `/${classroomId}/forum/delete-message`,
        method: 'DELETE',
        params: {
          messageId
        },
      }),
    }),
    getAllMessages: builder.query<any, {classroomId: string, page: number, pageSize: number}>({
      query: ({classroomId, page, pageSize}) => ({
        url: `/${classroomId}/forum/all-messages`,
        method: 'GET',
        params: {
          page,
          pageSize
        },
      })
    }),
  })
});

export const { 
  useCreateMessageMutation, 
  useEditMessageMutation, 
  useDeleteMessageMutation, 
  useGetAllMessagesQuery,
} = discussionApi;