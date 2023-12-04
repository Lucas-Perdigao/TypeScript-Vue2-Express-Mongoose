export interface IAuthService {
  login(data: LoginData): Promise<string>;
}

export type LoginData = {
  email: string,
  password: string
}