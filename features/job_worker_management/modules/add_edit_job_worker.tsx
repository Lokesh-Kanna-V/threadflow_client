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
import { UpdateJobWorkerAPI } from "../services/update_job_worker_api";
import { GetJobWorkersAPI } from "../services/get_job_workers_api";

type AddEditJobWorkerTypes = {
  editJobWorkerId: string | null;
  setShowCreateJobWorker: (value: boolean) => void;
  setEditJobWorkerId: (value: string | null) => void;
  setRefreshTrigger?: (fn: (prev: number) => number) => void;
};

export default function AddEditJobWorker({
  editJobWorkerId,
  setShowCreateJobWorker,
  setEditJobWorkerId,
  setRefreshTrigger,
}: AddEditJobWorkerTypes) {
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

  const createJobWorker = async (e: any) => {
    e.preventDefault();
    const response = await CreateJobWorkerAPI({
      job_worker_details: jobWorkerDetails,
    });
    if (response.success) {
      setShowCreateJobWorker(false);
      setJobWorkerDetails({
        company_id: "",
        name: "",
        contact: "",
        status: "",
      });
      if (setRefreshTrigger) {
        setRefreshTrigger((prev) => prev + 1);
      }
    }
  };

  const updateJobWorker = async (e: any) => {
    e.preventDefault();
    if (!editJobWorkerId) return;
    const response = await UpdateJobWorkerAPI({
      id: editJobWorkerId,
      name: jobWorkerDetails.name,
      contact: jobWorkerDetails.contact,
      status: jobWorkerDetails.status,
    });
    if (response.success) {
      setShowCreateJobWorker(false);
      setEditJobWorkerId(null);
      setJobWorkerDetails({
        company_id: "",
        name: "",
        contact: "",
        status: "",
      });
      if (setRefreshTrigger) {
        setRefreshTrigger((prev) => prev + 1);
      }
    }
  };

  const handleCancel = () => {
    setShowCreateJobWorker(false);
    setEditJobWorkerId(null);
    setJobWorkerDetails({
      company_id: "",
      name: "",
      contact: "",
      status: "",
    });
  };

  useEffect(() => {
    const company_id = localStorage.getItem("cid");
    handleJobWorkerDetailsChange("company_id", company_id || "");

    if (editJobWorkerId) {
      const fetchJobWorker = async () => {
        const company_id = localStorage.getItem("cid");
        const response = await GetJobWorkersAPI({
          company_id: company_id || undefined,
        });
        if (response.success && response.data?.data) {
          const worker = response.data.data.find(
            (w: any) => w.id === editJobWorkerId
          );
          if (worker) {
            setJobWorkerDetails({
              company_id: worker.company_id || company_id || "",
              name: worker.name || "",
              contact: worker.contact || "",
              status: worker.status || "",
            });
          }
        }
      };
      fetchJobWorker();
    }
  }, [user, editJobWorkerId]);

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          {editJobWorkerId ? "Edit job worker" : "Add a new job worker"}
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
                value={jobWorkerDetails.name}
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
                value={jobWorkerDetails.contact}
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
                value={jobWorkerDetails.status}
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
              onClick={handleCancel}
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
                if (editJobWorkerId) {
                  updateJobWorker(e);
                } else {
                  createJobWorker(e);
                }
              }}
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              {editJobWorkerId ? "Update Job Worker" : "Create Job Worker"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
