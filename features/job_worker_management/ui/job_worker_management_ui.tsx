"use client";

//? React and Next imports
import { useState } from "react";

//? Module Imports
import JobWorkerListDisplay from "../modules/job_worker_list_display";
import SearchAndCreate from "../modules/search_and_create";
import AddEditJobWorker from "../modules/add_edit_job_worker";

//? Shared UI Imports
import AlertBanner from "@/shared/ui/alert_banner";

//? Specification Imports
import { iconSpecifications } from "@/shared/local_db/general_specifications";

//? NPM UI Imports
import { ArrowUUpLeftIcon } from "@phosphor-icons/react";

export default function JobWorkerManagementUI() {
  const [showCreateJobWorker, setShowCreateJobWorker] = useState(false);
  const [editJobWorkerId, setEditJobWorkerId] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [alert, setAlert] = useState({ status: "", message: "" });

  const handleBack = () => {
    setShowCreateJobWorker(false);
    setEditJobWorkerId(null);
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <main className="p-4 md:ml-64 h-auto pt-20">
      {alert.status && (
        <div className="mb-4">
          <AlertBanner
            type={alert.status === "error" ? "error" : "success"}
            message={alert.message}
            onClose={() => setAlert({ status: "", message: "" })}
          />
        </div>
      )}
      <div
        className={`flex ${
          showCreateJobWorker ? "justify-between" : "justify-center"
        } items-baseline`}
      >
        {showCreateJobWorker ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              handleBack();
            }}
            className="border rounded-lg border-primary-700 cursor-pointer"
          >
            <ArrowUUpLeftIcon
              size={25}
              color={iconSpecifications.colour}
              weight={iconSpecifications.weight as any}
            />
          </button>
        ) : (
          <></>
        )}
        <h1 className="text-2xl text-center font-bold md:text-3xl border-b border-dashed border-gray-500 uppercase mb-5">
          {!showCreateJobWorker
            ? "Job Worker List"
            : editJobWorkerId
            ? "Edit Job Worker"
            : "Create Job Worker"}
        </h1>
      </div>

      {!showCreateJobWorker ? (
        <>
          <SearchAndCreate setShowCreateJobWorker={setShowCreateJobWorker} />
          <JobWorkerListDisplay
            setShowCreateJobWorker={setShowCreateJobWorker}
            setEditJobWorkerId={setEditJobWorkerId}
            refreshTrigger={refreshTrigger}
          />
        </>
      ) : (
        <>
          <AddEditJobWorker
            editJobWorkerId={editJobWorkerId}
            setShowCreateJobWorker={setShowCreateJobWorker}
            setEditJobWorkerId={setEditJobWorkerId}
            setRefreshTrigger={setRefreshTrigger}
            setAlert={setAlert}
          />
        </>
      )}
    </main>
  );
}
