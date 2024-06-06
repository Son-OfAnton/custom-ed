export interface Question {
  text: string,
  weight: number,
  answers: string[],
  correctAnswerIndex: number,
  assessmentId: string,
  tags: string[]
}
export interface CreateAssessementRequest {
  name: string
  description: string
  tag: string
  classroomId: string
  deadline: string
}

export interface CreateAssessementResponse {
  isSuccess: boolean;
  message: string;
  data?: CreateAssessementResponseData; 
  errors?: string[]; 
}

export interface CreateAssessementResponseData {
  id: string; 
  name: string;
  description: string;
  tag: string;
  questions: AssessmentQuestion[];
  classroom: AssessmentClassroom;
  isPublished: boolean;
  deadline: string; 
  createdAt: string; 
  updatedAt: string; 
}

export interface AssessmentQuestion {
  id: string;
  text: string;
  answers: AssessmentAnswer[];
  assessmentId: string;
  tags: string[];
  createdAt: string; 
  updatedAt: string; 
}

export interface AssessmentAnswer {
  id: string;
  questionId: string;
  text: string;
  isCorrect: boolean;
  createdAt: string; 
  updatedAt: string; 
}

export interface AssessmentClassroom {
  id: string;
  name: string;
  courseNo: string;
  description: string;
  creatorId: string;
  members: string[];
}

export interface GetAssessmentResponse {
  isSuccess: boolean
  message: string
  data: GetAssessmentResponseData[]
}

export interface GetAssessmentResponseData extends CreateAssessementResponseData {}

export interface PublishAssessmentResponse extends CreateAssessementResponse {}

export interface GetSingleAnnouncementResponse extends CreateAssessementResponse {}

export interface AddQuestionResponse {}

export interface GetQuestionsResponse extends CreateAssessementResponse{}

export interface PostSubmitAnswerRequest {
  studentId: string;
  assessmentId: string;
  answers: string[];
}

export interface PostSubmitAnswerResponse {
  isSuccess: boolean;
  message: string;
  data: PostSubmitAnswerResponseData;
  errors: string[];
}

export interface PostSubmitAnswerResponseData {
  id: string;
  studentId: string;
  assessmentId: string;
  answers: string[];
  score: number;
  createdAt: string;
  updatedAt: string;
}

export interface CheckAnswerResponse {
  isSuccess: boolean;
  message: string;
  data: CheckAnswerResponseData;
  errors: string[];
}

export interface CheckAnswerResponseData {
  id: string;
  studentId: string;
  assessmentId: string;
  answers: string[];
  score: number;
  createdAt: string;
  updatedAt: string;
}