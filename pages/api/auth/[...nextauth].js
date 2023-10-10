import CredentialsProvider from "next-auth/providers/credentials";
// import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

import { UserModel } from "@/lib/models";
import dbConnect from "@/lib/config/dbConnect";
import bcrypt from "bcryptjs";

export default async function auth(req, res) {
  return await NextAuth(req, res, {
    session: {
      strategy: "jwt",
    },
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        authorization: {
          params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code",
          },
        },
      }),
      GitHubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
      CredentialsProvider({
        async authorize(credentials, req) {
          await dbConnect();
          const { email, password } = credentials;
          const user = await UserModel.findOne({ email }).select("+password");
          if (!user) {
            throw new Error("Invalid email or password");
          }
          const isPasswordMatched = await bcrypt.compare(
            password,
            user.password
          );
          if (!isPasswordMatched) {
            throw new Error("Password does not match");
          }
          return user;
        },
      }),
    ],
    callbacks: {
      jwt: async ({ token, user }) => {
        user && (token.user = user);

        if (req.url === "/api/auth/session?update") {
          const updatedUser = await UserModel.findById(token.user._id);
          token.user = updatedUser;
        }

        return token;
      },
      session: async ({ session, token }) => {
        // const sessionUser = await UserModel.findOne({
        //   email: session.user.email,
        // });
        // session.user.id = sessionUser._id;
        session.user = token.user;
        session.accessToken = token.accessToken;
        delete session?.user?.password;

        return session;
      },
      signIn: async ({ account, profile }) => {
        console.log("//////////profile", profile, "//////////acount", account);
        if (account.provider === "google") {
          try {
            await dbConnect();
            const { email, picture, name } = profile;
            let user;
            user = await UserModel.findOne({ email });
            if (!user) {
              user = await UserModel.create({
                email,
                name,
                avatar: { url: picture },
              });
            }
            return user;
          } catch (err) {
            console.log(err);
            return false;
          }
        } else if (account.provider === "github") {
          try {
            await dbConnect();
            const { email, avatar_url, name } = profile;
            let user;
            user = await UserModel.findOne({ email });
            if (!user) {
              user = await UserModel.create({
                email,
                name,
                avatar: { url: avatar_url },
              });
            }
            return user;
          } catch (err) {
            console.log(err);
            return false;
          }
        }
        return true;
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
      signIn: "/login",
    },
  });
}
