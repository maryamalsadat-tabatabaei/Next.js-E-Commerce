import { getSession } from "next-auth/react";
import ErrorHandler from "../utils/errorHandler";
import { NextApiResponse } from "next";
import User from "@/interfaces/user";
import { CustomNextApiRequest } from "@/interfaces/user";

const isAuthenticatedUser = async (
  req: CustomNextApiRequest,
  res: NextApiResponse,
  next: Function
) => {
  const session = await getSession({ req });

  if (!session) {
    return next(new ErrorHandler("Login first to access this route", 401));
  }
  req.user = session.user as User;
  next();
};

export { isAuthenticatedUser };
