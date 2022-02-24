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
  password?: string;
  jwtToken?: string;
  userRole?: UserRole;
}

export enum UserRole {
  ROLE_USER,
  ROLE_ADMIN,
}

export interface LoginCredentials {
  email: string;
  password: string;
}
