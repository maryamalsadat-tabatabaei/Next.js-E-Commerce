"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import React, { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { parseCallbackUrl } from "@/helpers/parseCallbackUrl";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const params = useSearchParams();
  const callBackUrl = params?.get("callbackUrl");

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const data = await signIn("credentials", {
      email,
      password,
      callbackUrl: callBackUrl ? parseCallbackUrl(callBackUrl) : "/",
    });
    if (data?.error) {
      toast.error(data?.error);
    }

    if (data?.ok) {
      router.push("/");
    }
  };
  return (
    <div
      style={{ maxWidth: "480px" }}
      className="mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
    >
      <form onSubmit={submitHandler}>
        <h2 className="mb-5 text-2xl font-semibold">Login</h2>

        <div className="mb-4">
          <label className="block mb-1"> Email </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            type="text"
            placeholder="Type your email"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1"> Password </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            type="password"
            placeholder="Type your password"
            minLength={6}
            required
          />
        </div>

        <button
          type="submit"
          className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
        >
          Login
        </button>

        <hr className="mt-4" />

        <p className="text-center mt-5">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-500">
            Register
          </Link>
        </p>
      </form>
      <div className="flex justify-center gap-4 text-center mt-5">
        Or signup with
        <button onClick={() => signIn("google")} className="text-blue-500">
          <FaGoogle />
        </button>
        <button onClick={() => signIn("github")} className="text-blue-500">
          <FaGithub />
        </button>
      </div>
    </div>
  );
};

export default Login;
