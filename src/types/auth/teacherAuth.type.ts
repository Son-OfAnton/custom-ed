export interface TeacherLoginRequest {
    email: string;
    password: string;
}
export interface TeacherLoginResponseType {
    isSuccess?: boolean;
    message?:   string;
    data:      TeacherLogin;
    errors?:    string[];
}

export interface TeacherLogin  {
   id: string
  firstName: string
  lastName: string
  email: string
  role: number
  token: string
  imageUrl: string
}
export interface TeacherSignupRequest {
    email: string;
    password: string;
}

export interface TeacherSignupResponse {
    isSuccess?: boolean;
    message?:   string;
    data:      TeacherSignup;
    errors?:    string[];
}

export interface TeacherSignup {
    id:          string;
    firstName?:   string;
    lastName?:    string;
    email:       string;
    phoneNumber?: string;
    joinDate?:    Date;
    department?:  number;
    imageUrl?:    string;
}
