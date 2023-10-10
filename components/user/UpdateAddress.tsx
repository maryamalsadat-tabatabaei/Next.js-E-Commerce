"use client";
import BreadCrumbs from "../layouts/BreadCrumbs";
import { useContext, useEffect, useState } from "react";
import Sidebar from "../layouts/Sidebar";
import { countries } from "countries-list";
import { Form, Formik, Field } from "formik";
import validator from "validator";
import Address, { FormAddress } from "@/interfaces/address";
import { AuthContext } from "@/context/AuthContext";
import { toast } from "react-toastify";
import MapboxMap from "./AddressMap";
import Modal from "../layouts/Modal";

interface Country {
  name: string;
  code: string;
}
const UpdateAddress = ({
  address,
  addressId,
}: {
  address: Address;
  addressId: string;
}) => {
  const {
    error,
    deleted,
    setDeleted,
    clearErrors,
    updated,
    setUpdated,
    updateAddress,
    deleteAddress,
  } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [location, setLocation] = useState<{ [x: string]: number }>({
    latitude: address?.location?.latitude,
    longitude: address?.location?.longitude,
  });

  const countriesList: Country[] = Object.values(countries);
  const validateForm = (values: FormAddress) => {
    const errors: {
      street?: string;
      city?: string;
      state?: string;
      zipCode?: string;
      phoneNo?: string;
      country?: string;
    } = {};

    if (!values.street) {
      errors.street = "street is required";
    } else if (values.street.length > 15) {
      errors.street = "Must be 15 characters or less";
    }
    if (!values.city) {
      errors.city = "City is required";
    } else if (values.city.length > 15) {
      errors.city = "Must be 15 characters or less";
    }
    if (!values.state) {
      errors.state = "State is required";
    } else if (values.state.length > 15) {
      errors.state = "Must be 15 characters or less";
    }
    if (!values.zipCode) {
      errors.zipCode = "Zip code is required";
    } else if (values.zipCode.length > 20) {
      errors.zipCode = "Must be 20 characters or less";
    }

    if (!values.phoneNo) {
      errors.phoneNo = "Phone Number is required";
    } else if (
      !validator.isMobilePhone(values.phoneNo, "en-US", { strictMode: true })
    ) {
      errors.phoneNo = "Invalid Phone Number - +1XXXXXXXXXX";
    }

    return errors;
  };

  useEffect(() => {
    if (updated) {
      toast.success("Address Updated");
      setUpdated(false);
    }
    if (deleted) {
      toast.warn("Address Deleted");
      setDeleted(false);
    }
    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [error, updated, deleted, clearErrors, setUpdated, setDeleted]);

  const locationHandler = ({ ...location }) => {
    setLocation(location);
  };

  const submitHandler = (values: FormAddress) => {
    // e.preventDefault();

    updateAddress(addressId, values, location);
  };

  const openModalHanlder = () => setShowModal(true);
  const closeModalHanlder = () => setShowModal(false);

  const deleteHandler = (addressId: string) => {
    // alert("Modal Confirmed");
    deleteAddress(addressId);
    setShowModal(false);
  };
  const breadCrumbList = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Profile",
      url: "/profile",
    },
    {
      name: `${address?.street?.substring(0, 10)}...`,
      url: `/address/${addressId}`,
    },
  ];
  return (
    <>
      <BreadCrumbs breadCrumbList={breadCrumbList} />
      <section className="py-10">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col md:flex-row -mx-4">
            <Sidebar />
            <div className="md:w-2/3 lg:w-3/4 px-4">
              <Formik
                initialValues={{
                  city: address.city,
                  street: address.street,
                  phoneNo: address.phoneNo,
                  state: address.state,
                  zipCode: address.zipCode,
                  country: address.country,
                }}
                validate={validateForm}
                onSubmit={submitHandler}
              >
                {(formik) => (
                  <Form
                    style={{ maxWidth: "480px" }}
                    className="mt-1 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
                  >
                    <h2 className="mb-5 text-2xl font-semibold">
                      Update/ Delete address
                    </h2>
                    <div className="mb-4 md:col-span-2">
                      <label className="block mb-1" htmlFor="street">
                        street*{" "}
                      </label>
                      <Field
                        name="street"
                        type="text"
                        placeholder="Type your street"
                        className={`${
                          formik.touched.street &&
                          formik.errors.street &&
                          "border border-red-500 p-2"
                        } appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full`}
                      />

                      {formik.touched.street && formik.errors.street ? (
                        <div className="text-red-500 text-sm">
                          {formik.errors.street}
                        </div>
                      ) : null}
                    </div>

                    <div className="grid md:grid-cols-2 gap-x-3">
                      <div className="mb-4 md:col-span-1">
                        <label className="block mb-1" htmlFor="city">
                          City*{" "}
                        </label>
                        <Field
                          name="city"
                          type="text"
                          placeholder="Type city here"
                          className={`${
                            formik.touched.city &&
                            formik.errors.city &&
                            "border border-red-500 p-2"
                          } appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full`}
                        />

                        {formik.touched.city && formik.errors.city ? (
                          <div className="text-red-500 text-sm">
                            {formik.errors.city}
                          </div>
                        ) : null}
                      </div>

                      <div className="mb-4 md:col-span-1">
                        <label className="block mb-1" htmlFor="state">
                          State*{" "}
                        </label>
                        <Field
                          name="state"
                          type="text"
                          placeholder="Type state here"
                          className={`${
                            formik.touched.state &&
                            formik.errors.state &&
                            "border border-red-500 p-2"
                          } appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full`}
                        />

                        {formik.touched.state && formik.errors.state ? (
                          <div className="text-red-500 text-sm">
                            {formik.errors.state}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-x-2">
                      <div className="mb-4 md:col-span-1">
                        <label className="block mb-1" htmlFor="zipCode">
                          ZIP code*{" "}
                        </label>
                        <Field
                          name="zipCode"
                          type="text"
                          placeholder="Type zip code here"
                          className={`${
                            formik.touched.zipCode &&
                            formik.errors.zipCode &&
                            "border border-red-500 p-2"
                          } appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full`}
                        />

                        {formik.touched.zipCode && formik.errors.zipCode ? (
                          <div className="text-red-500 text-sm">
                            {formik.errors.zipCode}
                          </div>
                        ) : null}
                      </div>
                      <div className="mb-4 md:col-span-1">
                        <label className="block mb-1" htmlFor="phoneNo">
                          Phone Number*{" "}
                        </label>
                        <Field
                          name="phoneNo"
                          type="text"
                          placeholder="Type phone number here"
                          className={`${
                            formik.touched.phoneNo &&
                            formik.errors.phoneNo &&
                            "border border-red-500 p-2"
                          } appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full`}
                        />

                        {formik.touched.phoneNo && formik.errors.phoneNo ? (
                          <div className="text-red-500 text-sm">
                            {formik.errors.phoneNo}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="mb-4 md:col-span-2">
                      <label className="block mb-1" htmlFor="country">
                        Country*{" "}
                      </label>
                      <Field
                        name="country"
                        as="select"
                        placeholder="Type your street"
                        className={`${
                          formik.touched.street &&
                          formik.errors.street &&
                          "border border-red-500 p-2"
                        } appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full`}
                      >
                        <option value="" label="Select..." />
                        {countriesList.map((country) => (
                          <option
                            key={country.name}
                            value={country.name}
                            label={country.name}
                          >
                            {country.name}
                          </option>
                        ))}
                      </Field>

                      {formik.touched.country && formik.errors.country ? (
                        <div className="text-red-500 text-sm">
                          {formik.errors.country}
                        </div>
                      ) : null}
                    </div>
                    <MapboxMap
                      onLocationChange={locationHandler}
                      location={address?.location}
                    />

                    <div className="grid md:grid-cols-2 gap-x-3">
                      <button
                        type="submit"
                        className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                      >
                        Update
                      </button>

                      <button
                        type="button"
                        className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700"
                        onClick={openModalHanlder}
                      >
                        Delete
                      </button>

                      <Modal
                        isOpen={showModal}
                        onDismiss={closeModalHanlder}
                        title="Delete Confirmation"
                      >
                        <div className="mt-4 flex flex-col justify-center items-center ">
                          <h1 className="p-2 text-lg font-semibold">
                            Are you sure to delete?
                          </h1>
                          <hr className="text-gray-300  w-full mt-8 mb-2" />
                          <div className="flex justify-center items-center gap-10">
                            <button
                              className="px-4 py-2 bg-green-900 text-white rounded-lg"
                              type="submit"
                              onClick={() => deleteHandler(addressId)}
                            >
                              Confirm
                            </button>
                            <button
                              className="px-4 py-2 bg-red-900 text-white rounded-lg"
                              onClick={closeModalHanlder}
                            >
                              Dismiss
                            </button>
                          </div>
                        </div>
                      </Modal>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UpdateAddress;
