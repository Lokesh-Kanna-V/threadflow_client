"use client";

//? React & Next Imports
import { useEffect, useState } from "react";

//? Service Imports
import { GetJobWorkersAPI } from "../services/get_job_workers_api";

export default function JobWorkerListDisplay() {
  const [jobWorkerList, setJobWorkerList] = useState<
    { id: string; name: string; contact?: string; status?: string }[]
  >([]);

  useEffect(() => {
    const company_id = localStorage.getItem("cid");
    const fetchJobWorkers = async () => {
      const response = await GetJobWorkersAPI({
        company_id: company_id || undefined,
      });
      if (response.success && response.data?.data) {
        setJobWorkerList(response.data.data);
      }
    };
    fetchJobWorkers();
  }, []);

  return (
    <div>
      <div className="flex gap-5 flex-wrap justify-center md:border border-dashed border-gray-500 p-5">
        {jobWorkerList.map((worker, index) => (
          <button
            key={worker.id}
            className="block w-xs border rounded-lg shadow-xs border-gray-300 dark:border-gray-600 bg-emerald-100 dark:bg-gray-800 p-4 hover:cursor-pointer"
          >
            <div className="mb-3">
              <p className="text-sm italic text-left">Worker-{index + 1}</p>
              <p className="text-xl text-left">
                Name: <span className="font-bold">{worker.name}</span>
              </p>
              <hr className="text-gray-400"></hr>
            </div>
            <div className="mb-2">
              {worker.contact && (
                <p className="text-sm italic text-left">
                  Contact: {worker.contact}
                </p>
              )}
            </div>
            <p className="text-md text-left">
              Status:{" "}
              <span className="text-green-600">{worker.status || "Active"}</span>
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
