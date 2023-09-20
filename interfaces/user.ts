interface User {
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

export interface DefaultSessionUser {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
}
