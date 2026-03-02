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

//? Shared UI Imports
import ListLoader from "@/shared/ui/list_loader";

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
    contact_person: "",
    phone: "",
    email: "",
    address: "",
    status: "",
  });
  const [loading, setLoading] = useState(false);

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
        contact_person: "",
        phone: "",
        email: "",
        address: "",
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
      contact_person: jobWorkerDetails.contact_person,
      phone: jobWorkerDetails.phone,
      email: jobWorkerDetails.email,
      address: jobWorkerDetails.address,
      status: jobWorkerDetails.status,
    });
    if (response.success) {
      setShowCreateJobWorker(false);
      setEditJobWorkerId(null);
      setJobWorkerDetails({
        company_id: "",
        name: "",
        contact_person: "",
        phone: "",
        email: "",
        address: "",
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
      contact_person: "",
      phone: "",
      email: "",
      address: "",
      status: "",
    });
  };

  useEffect(() => {
    const company_id = localStorage.getItem("cid");
    handleJobWorkerDetailsChange("company_id", company_id || "");

    if (editJobWorkerId) {
      const fetchJobWorker = async () => {
        const cid = localStorage.getItem("cid");
        const response = await GetJobWorkersAPI({
          company_id: cid || undefined,
        });
        if (response.success && response.data?.data) {
          const worker = response.data.data.find(
            (w: any) => w.id === editJobWorkerId
          );
          if (worker) {
            setJobWorkerDetails({
              company_id: worker.company_id || cid || "",
              name: worker.name || "",
              contact_person: worker.contact_person || "",
              phone: worker.phone || "",
              email: worker.email || "",
              address: worker.address || "",
              status: worker.status || "",
            });
          }
        }
      };
      const load = async () => {
        setLoading(true);
        try {
          await fetchJobWorker();
        } finally {
          setLoading(false);
        }
      };
      load();
    }
  }, [user, editJobWorkerId]);

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          {editJobWorkerId ? "Edit job worker" : "Add a new job worker"}
        </h2>
        {loading ? (
          <ListLoader text="Loading job worker..." />
        ) : (
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
                htmlFor="contact_person"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Contact Person
              </label>
              <input
                type="text"
                name="contact_person"
                id="contact_person"
                value={jobWorkerDetails.contact_person}
                onChange={(e) => {
                  handleJobWorkerDetailsChange("contact_person", e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type contact person name"
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Phone
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                value={jobWorkerDetails.phone}
                onChange={(e) => {
                  handleJobWorkerDetailsChange("phone", e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter phone number"
              />
            </div>

            <div className="sm:col-span-2">
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
                value={jobWorkerDetails.email}
                onChange={(e) => {
                  handleJobWorkerDetailsChange("email", e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter email address"
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Address
              </label>
              <input
                type="text"
                name="address"
                id="address"
                value={jobWorkerDetails.address}
                onChange={(e) => {
                  handleJobWorkerDetailsChange("address", e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter address"
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
        )}
      </div>
    </section>
  );
}
