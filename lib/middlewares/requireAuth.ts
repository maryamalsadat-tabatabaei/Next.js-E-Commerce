import { getToken } from "next-auth/jwt";
import ErrorHandler from "../utils/errorHandler";
import { NextApiResponse } from "next";
import User, { CustomNextApiRequest } from "@/interfaces/user";

const isAuthenticatedUser = async (
  req: CustomNextApiRequest,
  res: NextApiResponse,
  next: Function
) => {
  const session: any = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!session) {
    return next(new ErrorHandler("Login first to access this route", 401));
  }

  req.user = session.user as User;

  next();
};

export { isAuthenticatedUser };
