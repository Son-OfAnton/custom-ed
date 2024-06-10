
export interface Teacher {
  id: string
  createdAt: string
  updatedAt: string
  firstName: string
  lastName: string
  dateOfBirth: string
  department: number
  phoneNumber: string
  joinDate: string
  email: string
  password: string
  role: number
}
export interface Student {
  id: string
  createdAt: string
  updatedAt: string
  studentId: string
  firstName: string
  lastName: string
  dateOfBirth: string
  department: number
  phoneNumber: string
  joinDate: string
  year: number
  section: string
  email: string
  password: string
  role: number
}
export interface Classroom {

  name: string;
  courseNo: string;
  description: string;
  creator: Teacher;
  members: Student[] | null;
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateClassroomRequest {
  name: string;
  courseNo: string;
  description: string;
}

export interface CreateClassroomResponse extends Classroom{
   
}

export interface EditClassroomRequest {
     id: string
  name: string
  courseNo: string
  description: string
  creatorId: string

}

export interface EditClassroomResponse extends CreateClassroomResponse {
    
}

export interface AddBatchRequest {
  section: string;
  year: number;
  department: number;
  classRoomId: string;

}

export interface AddBatchResponse extends CreateClassroomResponse {
}

export interface StudentClassroomResponse {
  isSuccess: boolean;
  message: string | null;
  data: Classroom[];
  errors: string[] | null;
}

export interface TeacherClassroomResponse extends StudentClassroomResponse {}

export interface GetClassroomByIdResponse extends AddBatchResponse {}

export interface DeleteClassroomRequest {

}

export interface DeleteClassroomResponse {
  
}

export interface SearchClassroomResponse {
  isSuccess: boolean;
  message: string;
  data: {
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    results: Classroom[] | null;
  };
  errors: string[] | null
}

export interface AddStudentRequest {
    studentId: string;
    classRoomId: string;

}

export interface AddStudentResponse extends CreateClassroomResponse {
  
}