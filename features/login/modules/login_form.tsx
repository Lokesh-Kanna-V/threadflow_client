"use client";

//? React & Next Import
import { useState, useEffect } from "react";
import Image from "next/image";

//? Service Imports
import { UserLogin } from "../services/login_api";

//? Shared UI Import
import LoadingSpinner from "@/shared/ui/spinner";

//? NPM UI Imports
import { X, Check } from "lucide-react";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState({
    status: "",
    message: "",
  });
  // const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setShowAlert({
        status: "",
        message: "",
      });
    }, 5000);
  }, [showAlert]);

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
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              {/* <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone Number
                </label>
                <input
                  type="phone"
                  name="phone"
                  id="phone"
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter Phone Number"
                  required
                />
              </div> */}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
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
                  placeholder="••••••••"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              {showAlert.status === "error" && (
                <div className="p-2 flex justify-center items-center border-red-900 rounded-xl">
                  <X className="text-red-500" />
                  <div className="ms-3 text-sm font-normal">
                    {showAlert.message}
                  </div>
                </div>
              )}
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();

                  UserLogin({ email, password, setLoading, setShowAlert });
                }}
                className={
                  `w-full text-white ` +
                  (showAlert.status == "error"
                    ? "bg-red-900 dark:bg-red-900 focus:ring-red-300 dark:focus:ring-red-800 hover:bg-red-900 dark:hover:bg-red-900 "
                    : "bg-primary-600 dark:bg-primary-600 focus:ring-primary-300 dark:focus:ring-primary-800 hover:bg-primary-700 dark:hover:bg-primary-700 ") +
                  " focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                }
              >
                {loading ? (
                  <div className="flex justify-center items-center">
                    <LoadingSpinner />{" "}
                  </div>
                ) : showAlert.status == "success" ? (
                  <div className="flex justify-center items-center">
                    <Check />
                  </div>
                ) : showAlert.status == "error" ? (
                  <div className="flex justify-center items-center">
                    <X />
                  </div>
                ) : (
                  "Sign in"
                )}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <a
                  href="/signup"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
      <p className="text-xs text-center md:text-right pb-2 md:pr-5 ">
        Powered By Gamma Grid
      </p>
    </section>
  );
}
