export interface getProfileByIdRequest {
    id : string
}
export interface getProfileByNameRequest {
    name : string
}
export interface getProfileByIdResponse {
  isSuccess: boolean
  message: string
  data: User
  errors: string[]
}

export interface User {
  id: string
  studentId: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  joinDate: string
  year: number
  section: string
  department: number
  imageUrl: string
}
export interface getPictureRequest{
    id : string
}
export interface getPictureResponse {
  isSuccess: boolean
  message: string
  data: string 
  errors: string[]
}
export interface updateProfileFieldRequest {
    phoneNumber : string
}
export interface updateProfileFieldResponse {
  isSuccess: boolean
  message: string
  data: User
  errors: string[]
}
export interface  changePasswordRequest{
  email: string,
  newPassword : string
}
export interface changePasswordResponse {
  isSuccess: boolean
  message: string
  data:  boolean
  errors: string[]
}
export interface uploadImageRequest {
  image : string
}
export interface uploadImageResponse {
  isSuccess: boolean
  message: string
  data: string
  errors: string[]
}

