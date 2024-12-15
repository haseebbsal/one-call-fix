import { TRADES } from "../enums";
import { ROLES } from "../enums";

export interface dashboardLinkType {
  link: string;
  title: string;
  icon: string;
}
export interface columnType {
  // name: string;
  title: string;
}

export interface VerifyEmailPayload {
  userId: string;
  verificationCode: string;
}

export interface VerifyEmailResponse {
  message: string;
}

export interface ResendEmailPayload {
  userId: string;
}

export interface apiResponseType<Data> {
  message: string;
  data: Data;
}
export type apiResponseTypeWithList<Data> = apiResponseType<Data> & {
  page: number;
  lastPage: number;
  total: number;
};

export interface errorType {
  response: {
    data: {
      message: string | string[];
    };
  };
}

export type sidebarMenuItemType = {
  label: string;
  icon: string;
} & (
  | {
      link?: undefined;
      subItems: {
        label: string;
        link: string;
      }[];
    }
  | {
      subItems?: undefined;
      link: string;
    }
);

export interface AuthState {
  user: any; // Define a more specific type based on your user data structure
  tokens: Tokens;
  loading: boolean;
  error: string | null | undefined;
}

export interface InitializeChatPayload {
  issue: string;
  trade: TRADES;
}

export interface UpdateChatPayload {
  chatId: string;
  answerIndex: number;
}

export interface InitializeChatResponse {
  message: string;
  data: {
    trade: TRADES;
    issue: string;
    assistantId: string;
    threadId: string;
    questionAnswers: QuestionAnswer[];
    conclusion: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface QuestionAnswer {
  question: string;
  options: string[];
  answerIndex: number;
  _id: string;
  name?: string;
  ownValue?: boolean;
  note?:string
}

export interface ChatState {
  chatId: string;
  conclusion: string;
  questions: QuestionAnswer[];
  loading: boolean;
  error: string | null | undefined;
  isChatCompleted: boolean;
}

export interface HomeOwnerPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

export interface Address {
  text: string;
  latitude: number;
  longitude: number;
  postalCode?: string;
  city?: string;
  country: string;
}
export interface TradesPersonPayload {
  companyName: string;
  address: Address;
  externalReviews: string;
  website: string;
  trade: TRADES | string;
  gasSafeRegistered?: boolean;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

export interface SignUpPayload {
  role: ROLES;
  homeOwner?: HomeOwnerPayload;
  tradesPerson?: TradesPersonPayload;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profilePicture: string;
  role: string;
  isDeleted: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface HomeOwnerProfile {
  firstName?: string;
  lastName?: string;
  address?: string;
  phone?: string;
  file?: File;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ForgotResetPasswordPayload {
  email: string;
  verificationCode: string;
  password: string;
}

export interface ForgotResetPasswordResponse {
  message: string;
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface LoginResponse {
  message: string;
  data: {
    user: User;
    tokens: Tokens;
  };
}

export interface Media {
  name: string;
  isVideo: boolean;
  _id: string;
}

export interface AddressResponse {
  location: {
    type: string;
    coordinates: number[];
  };
  postalCode: string;
  city: string;
  country: string;
}

export interface JobResponse {
  user: string;
  chat: string;
  estimatedBudget: string;
  completion: string;
  headline: string;
  media: Media[];
  address: AddressResponse;
  isDeleted: boolean;
  bidsBatch: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface JobState {
  job: JobResponse | null;
  allJobs: object;
  loading: boolean;
  error: string | null;
}

export interface JobFormValues {
  estimatedBudget?: string;
  completion?: string;
  headline: string;
  media: File[];
  postCode: string;
  chatId: string;
}

export interface Tokens {
  access_token: string;
  refresh_token: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface PasswordUpdatePayload {
  oldPassword: string;
  newPassword: string;
}

export interface PasswordUpdateResponse {
  message: string;
}

export interface HomeOwnerUpdateProfilePayload {
  firstName?: string;
  lastName?: string;
  phone?: string;
  file?: string;
}
