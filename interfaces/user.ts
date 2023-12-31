import { Types } from "mongoose";
interface User {
  // _id?: string;
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  avatar?: {
    public_id?: string;
    url?: string;
  };
  role: string;
  createdAt?: Date;
}
export default User;

import { NextApiRequest } from "next";

export interface CustomNextApiRequest extends NextApiRequest {
  user?: User;
}

export interface DefaultSessionUser {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  password?: string | null | undefined;

  expires: Date;
  accessToken?: string | undefined;
  user?: {
    _id: string;
    name: string;
    email: string;
    role: string;
    password: string;
    createdAt?: Date;
  };
}

export interface UpdatePasswordForm {
  currentPassword?: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UserForm {
  name: string;
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
