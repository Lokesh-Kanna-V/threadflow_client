"use client";

//? React & Next Imports
import { useState, useEffect } from "react";
import { useAuth } from "@/shared/context/AuthContext";

//? NPM UI Imports
import { PlusIcon, CaretDownIcon, XIcon } from "@phosphor-icons/react";

//? Specification Imports
import { iconSpecifications } from "@/shared/local_db/general_specifications";

//? Service Imports
import { CreateJobWorkerAPI } from "../services/create_job_worker_api";
import { UpdateJobWorkerAPI } from "../services/update_job_worker_api";
import { GetJobWorkersAPI } from "../services/get_job_workers_api";
import { jobStageApi } from "@/shared/services/job_stages_api";

//? Shared UI Imports
import ListLoader from "@/shared/ui/list_loader";
import AlertBanner from "@/shared/ui/alert_banner";

type AddEditJobWorkerTypes = {
  editJobWorkerId: string | null;
  setShowCreateJobWorker: (value: boolean) => void;
  setEditJobWorkerId: (value: string | null) => void;
  setRefreshTrigger?: (fn: (prev: number) => number) => void;
  setAlert?: (value: { status: string; message: string }) => void;
};

export default function AddEditJobWorker({
  editJobWorkerId,
  setShowCreateJobWorker,
  setEditJobWorkerId,
  setRefreshTrigger,
  setAlert: setParentAlert,
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
    job_stage_id: [] as string[],
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ status: "", message: "" });
  const [jobStages, setJobStages] = useState<{ id: string; name: string }[]>([]);
  const [jobStageDropdownOpen, setJobStageDropdownOpen] = useState(false);

  const handleJobWorkerDetailsChange = (field: string, value: string) => {
    setJobWorkerDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleJobStageToggle = (stageId: string) => {
    setJobWorkerDetails((prev) => {
      const current = prev.job_stage_id || [];
      const exists = current.includes(stageId);
      return {
        ...prev,
        job_stage_id: exists
          ? current.filter((id) => id !== stageId)
          : [...current, stageId],
      };
    });
  };

  const handleJobStageRemove = (stageId: string) => {
    setJobWorkerDetails((prev) => ({
      ...prev,
      job_stage_id: (prev.job_stage_id || []).filter((id) => id !== stageId),
    }));
  };

  const createJobWorker = async (e: any) => {
    e.preventDefault();
    const response = await CreateJobWorkerAPI({
      job_worker_details: jobWorkerDetails,
    });
    if (response.success) {
      const msg = {
        status: "success",
        message: "Job worker created successfully.",
      };
      if (setParentAlert) {
        setParentAlert(msg);
      } else {
        setAlert(msg);
      }
      setShowCreateJobWorker(false);
      setJobWorkerDetails({
        company_id: "",
        name: "",
        contact_person: "",
        phone: "",
        email: "",
        address: "",
        status: "",
        job_stage_id: [],
      });
      if (setRefreshTrigger) {
        setRefreshTrigger((prev) => prev + 1);
      }
    } else {
      setAlert({
        status: "error",
        message:
          response.error ||
          "Unable to create job worker. Please check the details and try again.",
      });
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
      job_stage_id: jobWorkerDetails.job_stage_id,
    });
    if (response.success) {
      const msg = {
        status: "success",
        message: "Job worker updated successfully.",
      };
      if (setParentAlert) {
        setParentAlert(msg);
      } else {
        setAlert(msg);
      }
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
        job_stage_id: [],
      });
      if (setRefreshTrigger) {
        setRefreshTrigger((prev) => prev + 1);
      }
    } else {
      setAlert({
        status: "error",
        message:
          response.error ||
          "Unable to update job worker. Please try again in a moment.",
      });
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
      job_stage_id: [],
    });
  };

  useEffect(() => {
    const company_id = localStorage.getItem("cid");
    handleJobWorkerDetailsChange("company_id", company_id || "");

    const fetchStages = async () => {
      const response = await jobStageApi();
      if (response.success && response.data?.stages) {
        setJobStages(
          response.data.stages.map((s: any) => ({ id: s.id, name: s.name || s.stage_name || "" }))
        );
      }
    };
    fetchStages();

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
            const stageIds = Array.isArray(worker.job_stage_id)
              ? worker.job_stage_id
              : [];
            setJobWorkerDetails({
              company_id: worker.company_id || cid || "",
              name: worker.name || "",
              contact_person: worker.contact_person || "",
              phone: worker.phone || "",
              email: worker.email || "",
              address: worker.address || "",
              status: worker.status || "",
              job_stage_id: stageIds,
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
        {alert.status && (
          <div className="mb-4">
            <AlertBanner
              type={alert.status === "error" ? "error" : "success"}
              message={alert.message}
              onClose={() => setAlert({ status: "", message: "" })}
            />
          </div>
        )}
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

              <div className="sm:col-span-2 relative">
                <label
                  htmlFor="job_stages"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Job Stages
                </label>
                <div
                  onClick={() => setJobStageDropdownOpen((prev) => !prev)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full min-h-[42px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 cursor-pointer flex items-center justify-between"
                >
                  <div className="flex flex-wrap gap-1.5 flex-1">
                    {(jobWorkerDetails.job_stage_id || []).length > 0 ? (
                      (jobWorkerDetails.job_stage_id || []).map((stageId) => {
                        const stage = jobStages.find((s) => s.id === stageId);
                        return (
                          <span
                            key={stageId}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleJobStageRemove(stageId);
                            }}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 text-xs"
                          >
                            {stage?.name || stageId}
                            <XIcon size={14} weight="bold" />
                          </span>
                        );
                      })
                    ) : (
                      <span className="text-gray-500 dark:text-gray-400">
                        Select job stages
                      </span>
                    )}
                  </div>
                  <CaretDownIcon
                    size={18}
                    weight="bold"
                    className={`shrink-0 ml-2 transition-transform ${jobStageDropdownOpen ? "rotate-180" : ""}`}
                  />
                </div>
                {jobStageDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      aria-hidden="true"
                      onClick={() => setJobStageDropdownOpen(false)}
                    />
                    <div className="absolute z-20 mt-1 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                      {jobStages.length === 0 ? (
                        <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                          No stages available
                        </div>
                      ) : (
                        jobStages.map((stage) => {
                          const isSelected = (jobWorkerDetails.job_stage_id || []).includes(stage.id);
                          return (
                            <div
                              key={stage.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleJobStageToggle(stage.id);
                              }}
                              className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 ${isSelected ? "bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-200" : "text-gray-900 dark:text-white"}`}
                            >
                              {stage.name}
                            </div>
                          );
                        })
                      )}
                    </div>
                  </>
                )}
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
