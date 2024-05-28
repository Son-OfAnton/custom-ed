export interface VerifyOtpRequest {
    email:   string;
    otpCode: string;
}
export interface VerifyOtpResponse {
    isSuccess?: boolean;
    message?:   string;
    data:      User;
    errors?:    string[];
}

export interface User {
    id:    string;
    email: string;
    role:  number;
    token: string;
}
export interface SendOtpForForgotPasswordRequest{
    Email: string
}
export interface SendOtpForForgotPasswordResponse{
isSuccess: boolean
  message: string
  data: boolean
  errors: string[]
}
