"use client";

//? React & Next Imports
import { useState, useEffect } from "react";
import { useAuth } from "@/shared/context/AuthContext";

//? NPM UI Imports
import { PlusIcon } from "@phosphor-icons/react";

//? Specification Imports
import { iconSpecifications } from "@/shared/local_db/general_specifications";

//? Service Imports
import { CreateJobWorkerAPI } from "../services/create_job_worker_api";

export default function AddEditJobWorker() {
  const { user } = useAuth();

  const [jobWorkerDetails, setJobWorkerDetails] = useState({
    company_id: "",
    name: "",
    contact: "",
    status: "",
  });

  const handleJobWorkerDetailsChange = (field: string, value: string) => {
    setJobWorkerDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const createJobWorker = (e: any) => {
    e.preventDefault();
    CreateJobWorkerAPI({ job_worker_details: jobWorkerDetails });
  };

  useEffect(() => {
    const company_id = localStorage.getItem("cid");
    handleJobWorkerDetailsChange("company_id", company_id || "");
  }, [user]);

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Add a new job worker
        </h2>
        <form action="#">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={(e) => {
                  handleJobWorkerDetailsChange("name", e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type job worker name"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="contact"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Contact
              </label>
              <input
                type="text"
                name="contact"
                id="contact"
                onChange={(e) => {
                  handleJobWorkerDetailsChange("contact", e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter contact number or email"
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="status"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Status
              </label>
              <input
                type="text"
                name="status"
                id="status"
                onChange={(e) => {
                  handleJobWorkerDetailsChange("status", e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="e.g. Active"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              className="inline-flex items-center gap-2 px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              <PlusIcon
                size={iconSpecifications.size}
                color={iconSpecifications.colour}
                weight={iconSpecifications.weight as any}
              />
              Cancel
            </button>

            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                createJobWorker(e);
              }}
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              Create Job Worker
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
