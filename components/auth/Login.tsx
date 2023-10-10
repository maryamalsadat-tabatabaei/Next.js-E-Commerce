"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { Form, Formik, Field } from "formik";
import validator from "validator";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { parseCallbackUrl } from "@/helpers/parseCallbackUrl";

const Login = () => {
  const router = useRouter();
  const params = useSearchParams();
  const callBackUrl = params?.get("callbackUrl");

  const validateForm = (values: { password: string; email: string }) => {
    const errors: {
      email?: string;
      password?: string;
    } = {};

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!validator.isEmail(values.email)) {
      errors.email = "Invalid email";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (!validator.isStrongPassword(values.password)) {
      errors.password =
        "Password must contain one Capital letter, Small Letter, Number & Special symbol";
    } else if (values.password.length < 6) {
      errors.password = "Must be 6 characters or more";
    }

    return errors;
  };

  const submitHandler = async (values: { email: string; password: string }) => {
    // e.preventDefault();
    const { email, password } = values;
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
  const signInHandler = async (provider: string) => {
    const data = await signIn(provider, {
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
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validate={validateForm}
        onSubmit={submitHandler}
      >
        {(formik) => (
          <>
            <Form
            // style={{ maxWidth: "480px" }}
            // className="mt-1 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
            >
              <h2 className="mb-5 text-2xl font-semibold">Login</h2>

              <div className="mb-4 md:col-span-2">
                <label className="block mb-1" htmlFor="email">
                  Email*{" "}
                </label>
                <Field
                  name="email"
                  type="email"
                  placeholder="Type your email"
                  className={`${
                    formik.touched.email &&
                    formik.errors.email &&
                    "border border-red-500 p-2"
                  } appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full`}
                />

                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>
              <div className="mb-4 md:col-span-2">
                <label className="block mb-1" htmlFor="password">
                  Password*{" "}
                </label>
                <Field
                  name="password"
                  type="password"
                  minLength={6}
                  required
                  placeholder="Type your password"
                  className={`${
                    formik.touched.password &&
                    formik.errors.password &&
                    "border border-red-500 p-2"
                  } appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full`}
                />

                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>

              <div className="form-group">
                <button
                  type="submit"
                  className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                >
                  Login
                </button>
              </div>
              <hr className="mt-4" />

              <p className="text-center mt-5">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-blue-500">
                  Register
                </Link>
              </p>
            </Form>
          </>
        )}
      </Formik>
      <div className="flex justify-center gap-4 text-center mt-5">
        Or signup with
        <button
          onClick={() => signInHandler("google")}
          className="text-blue-500"
        >
          <FaGoogle />
        </button>
        <button
          onClick={() => signInHandler("github")}
          className="text-blue-500"
        >
          <FaGithub />
        </button>
      </div>
    </div>
  );
};

export default Login;
