interface User {
  _id?: string;
  name: string;
  email: string;
  password: string;
  avatar?: {
    public_id?: string;
    url?: string;
  };
  role?: string;
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
}
