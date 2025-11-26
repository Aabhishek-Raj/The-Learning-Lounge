export interface JwtUserPayload {
  profileId: string;
  email: string;
  name: string;
  role?: string
  iat?: number;
  exp?: number;
}
