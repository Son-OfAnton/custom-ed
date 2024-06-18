export interface AdminSigninRequest {
  email: string;
  password: string;
}

export interface AdminSigninResponse {
  isSuccess: boolean;
  message: string | null;
  data: {
    id: string;
    email: string;
    role: number;
    token: string;
  },
  errors: string[] | null;
}