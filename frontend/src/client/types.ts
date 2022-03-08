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
  ROLE_USER,
  ROLE_ADMIN,
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export enum VaccinationType {
  PFIZER_BIONTECH,
  MODERNA,
}

export interface Vaccination {
  userId: number;
  centre: string;
  firstAppointment: Date;
  secondAppointment: Date;
  firstVaccinationType: VaccinationType;
  secondVaccinationType: VaccinationType;
  dosesRecieved: number;
}
