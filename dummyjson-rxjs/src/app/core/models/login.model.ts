export interface LoginRequest {
  username: string | null;
  password: string | null;
  expiresInMins?: number | null;
}

export interface LoginResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken?: string;
}
