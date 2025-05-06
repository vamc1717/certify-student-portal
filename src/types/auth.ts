
export type UserRole = 'state' | 'dist' | 'college' | 'student' | 'verification';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organizationName?: string;
  district?: string;
  state?: string;
  registrationNumber?: string;
}

export interface LoginCredentials {
  email: string;
  password?: string;
  otp?: string;
  registrationNumber?: string;
  otpSent?: boolean;
}
