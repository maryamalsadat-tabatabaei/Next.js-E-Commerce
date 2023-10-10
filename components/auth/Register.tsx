"use client";

import Link from "next/link";
import { useContext, useEffect } from "react";
import { Form, Formik, Field } from "formik";
import validator from "validator";
import { AuthContext } from "@/context/AuthContext";
import { toast } from "react-toastify";
import { RegisterForm } from "@/interfaces/user";

const Register = () => {
  const { error, registerUser, clearErrors, updated, setUpdated } =
    useContext(AuthContext);

  const validateForm = (values: RegisterForm) => {
    const errors: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!values.name) {
      errors.name = "Name is required";
    } else if (values.name.length > 20) {
      errors.name = "Must be 20 characters or less";

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

      if (!values.confirmPassword) {
        errors.confirmPassword = "Confirm password is required";
      } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "Password does not match";
      } else if (values.confirmPassword.length < 6) {
        errors.confirmPassword = "Must be 6 characters or more";
      }

      return errors;
    }
  };

  useEffect(() => {
    if (updated) {
      toast.success("Address created successfully.");
      setUpdated(false);
    }
    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [error, updated, setUpdated, clearErrors]);

  const submitHandler = (values: RegisterForm) => {
    // e.preventDefault();
    const { name, email, password } = values;
    registerUser({ name, email, password });
  };

  return (
    <div
      style={{ maxWidth: "480px" }}
      className="mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
    >
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validate={validateForm}
        onSubmit={submitHandler}
      >
        {(formik) => (
          <Form
          // style={{ maxWidth: "480px" }}
          // className="mt-1 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
          >
            <h2 className="mb-5 text-2xl font-semibold">Register</h2>
            <div className="mb-4 md:col-span-2">
              <label className="block mb-1" htmlFor="name">
                Full Name*{" "}
              </label>
              <Field
                name="name"
                type="text"
                placeholder="Type your full name"
                className={`${
                  formik.touched.name &&
                  formik.errors.name &&
                  "border border-red-500 p-2"
                } appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full`}
              />

              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-500 text-sm">{formik.errors.name}</div>
              ) : null}
            </div>
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
            <div className="mb-4 md:col-span-2">
              <label className="block mb-1" htmlFor="confirmPassword">
                Confirm Password*{" "}
              </label>
              <Field
                name="confirmPassword"
                type="password"
                minLength={6}
                required
                placeholder="Type your confirm password"
                className={`${
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword &&
                  "border border-red-500 p-2"
                } appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full`}
              />

              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
              >
                Register
              </button>
            </div>

            <hr className="mt-4" />

            <p className="text-center mt-5">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-500">
                Sign in
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
