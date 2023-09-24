"use client";
import { useEffect, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { Form, Formik, Field } from "formik";
import validator from "validator";
import { toast } from "react-toastify";
import { UpdatePasswordForm } from "@/interfaces/user";

const UpdatePassword = () => {
  // const [newPassword, setNewPassword] = useState("");
  // const [currentPassword, setCurrentPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");

  const { error, updatePassword, clearErrors, updated, setUpdated } =
    useContext(AuthContext);

  useEffect(() => {
    if (updated) {
      toast.success("Password updated successfully.");
      setUpdated(false);
    }
    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [error]);

  const validateForm = (values: UpdatePasswordForm) => {
    const errors: {
      currentPassword?: string;
      newPassword?: string;
      confirmPassword?: string;
    } = {};

    if (!values.currentPassword) {
      errors.currentPassword = "Password is required";
    } else if (!validator.isStrongPassword(values.currentPassword)) {
      errors.currentPassword =
        "Password must contain one Capital letter, Small Letter, Number & Special symbol";
    } else if (values.currentPassword.length < 6) {
      errors.currentPassword = "Must be 6 characters or more";
    }

    if (!values.newPassword) {
      errors.newPassword = "Password is required";
    } else if (!validator.isStrongPassword(values.newPassword)) {
      errors.newPassword =
        "Password must contain one Capital letter, Small Letter, Number & Special symbol";
    } else if (values.newPassword.length < 6) {
      errors.newPassword = "Must be 6 characters or more";
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = "Confirm password is required";
    } else if (values.newPassword !== values.confirmPassword) {
      errors.confirmPassword = "Password does not match";
    } else if (values.confirmPassword.length < 6) {
      errors.confirmPassword = "Must be 6 characters or more";
    }

    return errors;
  };
  const submitHandler = (values: UpdatePasswordForm) => {
    // e.preventDefault();

    console.log("values", values);
    updatePassword({ ...values });
  };
  return (
    <>
      <div
        style={{ maxWidth: "480px" }}
        className="mt-5 mb-20 p-4 md:p-7 mx-auto rounded bg-white"
      >
        <Formik
          initialValues={{
            currentPassword: "",
            newPassword: "",
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
              <h2 className="mb-5 text-2xl font-semibold">Update Password</h2>
              <div className="mb-4 md:col-span-2">
                <label className="block mb-1" htmlFor="currentPassword">
                  Current Password*{" "}
                </label>
                <Field
                  name="currentPassword"
                  type="password"
                  minLength={6}
                  required
                  placeholder="Type your current password"
                  className={`${
                    formik.touched.currentPassword &&
                    formik.errors.currentPassword &&
                    "border border-red-500 p-2"
                  } appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full`}
                />

                {formik.touched.currentPassword &&
                formik.errors.currentPassword ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.currentPassword}
                  </div>
                ) : null}
              </div>
              <div className="mb-4 md:col-span-2">
                <label className="block mb-1" htmlFor="newPassword">
                  New Password*{" "}
                </label>
                <Field
                  name="newPassword"
                  type="password"
                  minLength={6}
                  required
                  placeholder="Type your new password"
                  className={`${
                    formik.touched.newPassword &&
                    formik.errors.newPassword &&
                    "border border-red-500 p-2"
                  } appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full`}
                />

                {formik.touched.newPassword && formik.errors.newPassword ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.newPassword}
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
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default UpdatePassword;
