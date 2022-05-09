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
  vaccination?: Vaccination;
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
  matchingPassword: string;
  ageGroup: string;
}

// Vaccination
export enum VaccineType {
  PFIZER_BIONTECH = "PFIZER_BIONTECH",
  MODERNA = "MODERNA",
}

export interface Vaccination {
  id?: number;
  centre: string;
  firstAppointment: string | Date;
  secondAppointment?: string | Date;
  firstVaccineType?: VaccineType;
  secondVaccineType?: VaccineType;
  dosesReceived?: number;
}

export interface BookingDetailsKeys {
  centre: string;
  firstAppointment: string;
}

export interface VaccinationUpdate {
  firstVaccineType?: VaccineType;
  secondVaccineType?: VaccineType;
}

// Statistics
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

export type ChartData = { x: number; y: string }[];

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
