import { Response } from './index';

export interface LoginCredentials {
  username: string
  password: string
}

export interface Login {
  token: string
}

export interface LoginResponse extends Response<Login> {
  result: Login
}