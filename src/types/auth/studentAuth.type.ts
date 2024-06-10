export interface StudentLoginRequest{
    email: string
    password: string
}
export interface StudentLoginResponse {
    isSuccess?: boolean;
    message?:   string;
    data:      Student;
    errors?:    string[];
}

export interface Student {
    id: string
    firstName: string
    lastName: string
    email: string
    role: number
    token: string
    imageUrl: string
}
export interface StudentSignupRequest {
    email: string
    password: string
}
export interface StudentSignupResponse{
    isSuccess?: boolean;
    message?:   string;
    data:      StudentSignup;
    errors?:    string[];
}

export interface  StudentSignup {
    id?:          string;
    createdAt?:   Date;
    updatedAt?:   Date;
    email:       string;
    password?:    string;
    role?:        number;
    isVerified?:  boolean;
    imageUrl?:    string;
    studentId?:   string;
    firstName?:   string;
    lastName?:    string;
    dateOfBirth?: Date;
    department?:  number;
    phoneNumber?: string;
    joinDate?:    Date;
    year?:        number;
    section?:     string;
}
