"use client";

//? React and Next imports
import { useState } from "react";

//? Module Imports
import JobWorkerListDisplay from "../modules/job_worker_list_display";
import SearchAndCreate from "../modules/search_and_create";
import AddEditJobWorker from "../modules/add_edit_job_worker";

//? Specification Imports
import { iconSpecifications } from "@/shared/local_db/general_specifications";

//? NPM UI Imports
import { ArrowUUpLeftIcon } from "@phosphor-icons/react";

export default function JobWorkerManagementUI() {
  const [showCreateJobWorker, setShowCreateJobWorker] = useState(false);
  return (
    <main className="p-4 md:ml-64 h-auto pt-20">
      <div
        className={`flex ${
          showCreateJobWorker ? "justify-between" : "justify-center"
        } items-baseline`}
      >
        {showCreateJobWorker ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowCreateJobWorker(false);
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
            : "Create Job Worker"}
        </h1>
      </div>

      {!showCreateJobWorker ? (
        <>
          <SearchAndCreate setShowCreateJobWorker={setShowCreateJobWorker} />
          <JobWorkerListDisplay />
        </>
      ) : (
        <>
          <AddEditJobWorker />
        </>
      )}
    </main>
  );
}
