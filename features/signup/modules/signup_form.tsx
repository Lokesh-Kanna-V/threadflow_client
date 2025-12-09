"use client";

//? React and Next Imports
import { useState } from "react";
import Image from "next/image";

export default function SignUpForm() {
  const [pageNumber, setPageNumber] = useState(1);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showAlert, setShowAlert] = useState({
    status: "",
    message: "",
  });
  const [companyData, setCompanyData] = useState({
    name: "",
    email: "",
    phone: "",
    gst: "",
    logo_url: "",
    type: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: " ",
  });
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    roll: "",
  });

  const handleCompamyDataChange = (field: string, value: string) => {
    setCompanyData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUserDataChange = (field: string, value: string) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSignup = () => {
    console.log({ termsAccepted });
    if (!termsAccepted) {
      setShowAlert({
        status: "error",
        message: "Please Accept Terms And Conditions",
      });
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <Image
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
            height={100}
            width={100}
          />
          ThreadFlow Sync
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            {/* //? Page-1 */}
            {pageNumber == 1 ? (
              <form className="space-y-4 md:space-y-6" action="#">
                {/* //? Company Name */}
                <div>
                  <label
                    htmlFor="company_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Company Name *
                  </label>
                  <input
                    name="company_name"
                    id="company_name"
                    onChange={(e) => {
                      handleCompamyDataChange("name", e.target.value);
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Your Company Name"
                    required
                  />
                </div>
                {/* //? Company Type */}
                <div>
                  <label
                    htmlFor="countries"
                    className="block mb-2.5 text-sm font-medium text-heading"
                  >
                    Company Type
                  </label>
                  <select
                    name="company_type"
                    id="company_type"
                    onChange={(e) => {
                      handleCompamyDataChange("type", e.target.value);
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
               focus:ring-primary-600 focus:border-primary-600 
               block w-full p-2.5 
               dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
               dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option value="">Choose a Type</option>
                    <option value="factory">Factory</option>
                    <option value="exporter">Exporter</option>
                    <option value="jobwork">Job-Work</option>
                  </select>
                </div>
                {/* //? GST */}
                <div>
                  <label
                    htmlFor="gst"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    GST Number
                  </label>
                  <input
                    name="gst"
                    id="gst"
                    placeholder="Company GST"
                    onChange={(e) => {
                      handleCompamyDataChange("gst", e.target.value);
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required
                  />
                </div>
                {/* //? Company Email */}
                <div>
                  <label
                    htmlFor="company_email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="company_email"
                    id="company_email"
                    onChange={(e) => {
                      handleCompamyDataChange("email", e.target.value);
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="email@company.com"
                    required
                  />
                </div>
                {/* //? Company Phone Number */}
                <div>
                  <label
                    htmlFor="company_phone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone Number *
                  </label>
                  <input
                    name="company_phone"
                    id="company_phone"
                    onChange={(e) => {
                      handleCompamyDataChange("phone", e.target.value);
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Company Phone Number"
                    required
                  />
                </div>
              </form>
            ) : pageNumber == 2 ? (
              //? Page-2
              <form className="space-y-4 md:space-y-6" action="#">
                {/* //? Address Line 1 */}
                <div>
                  <label
                    htmlFor="address_line_1"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Address Line 1 *
                  </label>
                  <input
                    name="address_line_1"
                    id="address_line_1"
                    onChange={(e) => {
                      handleCompamyDataChange("address_line_1", e.target.value);
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Address line 1"
                    required
                  />
                </div>
                {/* //? Address Line 2 */}
                <div>
                  <label
                    htmlFor="address_line_2"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Address Line 2
                  </label>
                  <input
                    name="address_line_2"
                    id="address_line_2"
                    placeholder="Address Line 2"
                    onChange={(e) => {
                      handleCompamyDataChange("type", e.target.value);
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required
                  />
                </div>
                {/* //? City */}
                <div>
                  <label
                    htmlFor="city"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    City *
                  </label>
                  <input
                    name="city"
                    id="city"
                    onChange={(e) => {
                      handleCompamyDataChange("type", e.target.value);
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Select City"
                    required
                  />
                </div>
                {/* //? State */}
                <div>
                  <label
                    htmlFor="state"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    State *
                  </label>
                  <input
                    name="state"
                    id="state"
                    onChange={(e) => {
                      handleCompamyDataChange("type", e.target.value);
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Select State"
                    required
                  />
                </div>
              </form>
            ) : pageNumber == 3 ? (
              <form className="space-y-4 md:space-y-6" action="#">
                {/* //? Admin User Name */}
                <div>
                  <label
                    htmlFor="user_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Admin User Name *
                  </label>
                  <input
                    name="user_name"
                    id="user_name"
                    onChange={(e) => {
                      handleUserDataChange("name", e.target.value);
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Your Company Name"
                    required
                  />
                </div>
                {/* //? Admin Email */}
                <div>
                  <label
                    htmlFor="user_email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Admin Email
                  </label>
                  <input
                    type="user_email"
                    name="user_email"
                    id="user_email"
                    onChange={(e) => {
                      handleUserDataChange("email", e.target.value);
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="email@company.com"
                    required
                  />
                </div>
                {/* //? Admin Phone Number */}
                <div>
                  <label
                    htmlFor="user_phone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone Number *
                  </label>
                  <input
                    name="user_phone"
                    id="user_phone"
                    onChange={(e) => {
                      handleUserDataChange("phone", e.target.value);
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Company Phone Number"
                    required
                  />
                </div>
                {/* //? Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e) => {
                      handleUserDataChange("password", e.target.value);
                    }}
                    placeholder="Company GST"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required
                  />
                </div>
              </form>
            ) : (
              ""
            )}
            {/* //? Terms & Condition */}
            {pageNumber == 3 ? (
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    onChange={() => {
                      setTermsAccepted(!termsAccepted);
                      setShowAlert({
                        status: "",
                        message: "",
                      });
                    }}
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
            ) : (
              ""
            )}

            {/* //? Login */}
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Login here
              </a>
            </p>

            {showAlert.status ? (
              <div
                className="p-3 text-center mb-4 text-sm bg-red-900 rounded-xl"
                role="alert"
              >
                {showAlert.message}
              </div>
            ) : (
              ""
            )}

            {/* //? Button Section */}
            <div className="flex gap-5">
              {pageNumber > 1 ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();

                    if (pageNumber > 1) {
                      setPageNumber(pageNumber - 1);
                    }
                  }}
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Back
                </button>
              ) : (
                ""
              )}
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();

                  if (pageNumber < 3) {
                    setPageNumber(pageNumber + 1);
                  } else {
                    handleSignup();
                  }
                }}
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {pageNumber == 3 ? "Create account" : "Next"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-center pb-1">Powered By Gamma Grid</p>
    </section>
  );
}
