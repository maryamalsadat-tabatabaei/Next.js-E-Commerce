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

const authorizeRoles = (...roles: string[]) => {
  return (req: CustomNextApiRequest, res: NextApiResponse, next: Function) => {
    if (!roles.includes(req.user?.role as string)) {
      return next(
        new ErrorHandler(
          `Role (${req.user?.role}) is not allowed to access this resource.`,
          401
        )
      );
    }
    next();
  };
};

export { isAuthenticatedUser, authorizeRoles };
