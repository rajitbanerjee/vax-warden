// User
export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  ppsn: string;
  address: string;
  email: string;
  phoneNo: string;
  nationality: string;
  gender: Gender;
  password?: string;
  jwtToken?: string;
  userRole?: UserRole;
}

export enum Gender {
  MALE,
  FEMALE,
  OTHER,
}

export enum UserRole {
  ROLE_USER = "ROLE_USER",
  ROLE_ADMIN = "ROLE_ADMIN",
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface UserDetailsKeys {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  ppsn: string;
  address: string;
  email: string;
  phoneNo: string;
  nationality: string;
  gender: string;
  password: string;
}

// Vaccination
export enum VaccineType {
  PFIZER_BIONTECH,
  MODERNA,
}

export interface Vaccination {
  userId: number;
  centre: string;
  firstAppointment: Date;
  secondAppointment: Date;
  firstVaccineType: VaccineType;
  secondVaccineType: VaccineType;
  dosesRecieved: number;
}

export interface Stats {
  centre: { [key: string]: number };
  firstAppointment?: { [key: string]: number };
  secondAppointment?: { [key: string]: number };
  firstVaccineType: { [key: string]: number };
  secondVaccineType: { [key: string]: number };
  dosesReceived: { [key: number]: number };
  nationality: { [key: string]: number };
  gender: { [key: string]: number };
  ageGroup: { [key: string]: number };
}

export type ChartData = { x: string; y: number }[];

// Forum
export interface Post {
  id: number;
  replyToPostId?: number;
  timestamp: Date;
  content: string;
  firstName: string;
  lastName: string;
}

export interface OrganisedPosts {
  [postId: number]: {
    post: Post;
    replies: Post[];
  };
}
