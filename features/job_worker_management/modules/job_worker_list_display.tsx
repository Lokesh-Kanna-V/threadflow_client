"use client";

//? React & Next Imports
import { useEffect, useState } from "react";

//? Service Imports
import { GetJobWorkersAPI } from "../services/get_job_workers_api";
import { DeleteJobWorkerAPI } from "../services/delete_job_worker_api";

//? NPM UI Imports
import { PencilSimple, Trash } from "@phosphor-icons/react";

//? Specification Imports
import { iconSpecifications } from "@/shared/local_db/general_specifications";

//? Shared UI Imports
import ListLoader from "@/shared/ui/list_loader";

type JobWorkerListDisplayTypes = {
  setShowCreateJobWorker: (value: boolean) => void;
  setEditJobWorkerId: (value: string | null) => void;
  refreshTrigger?: number;
  searchText?: string;
};

export default function JobWorkerListDisplay({
  setShowCreateJobWorker,
  setEditJobWorkerId,
  refreshTrigger,
  searchText,
}: JobWorkerListDisplayTypes) {
  const [jobWorkerList, setJobWorkerList] = useState<
    { id: string; name: string; contact?: string; status?: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchJobWorkers = async () => {
    const company_id = localStorage.getItem("cid");
    const response = await GetJobWorkersAPI({
      company_id: company_id || undefined,
    });
    if (response.success && response.data?.data) {
      setJobWorkerList(response.data.data);
    } else {
      setJobWorkerList([]);
    }
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        await fetchJobWorkers();
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [refreshTrigger]);

  const handleEdit = (workerId: string) => {
    setEditJobWorkerId(workerId);
    setShowCreateJobWorker(true);
  };

  const handleDelete = async (workerId: string) => {
    if (confirm("Are you sure you want to delete this job worker?")) {
      const response = await DeleteJobWorkerAPI({ id: workerId });
      if (response.success) {
        fetchJobWorkers();
      }
    }
  };

  const filteredJobWorkerList = jobWorkerList.filter((worker) => {
    if (!searchText || !searchText.trim()) return true;
    const query = searchText.toLowerCase();
    return (
      worker.name.toLowerCase().includes(query) ||
      (worker.contact || "").toLowerCase().includes(query) ||
      (worker.status || "").toLowerCase().includes(query)
    );
  });

  return (
    <div>
      <div className="flex gap-5 flex-wrap justify-center md:border border-dashed border-gray-500 p-5">
        {loading ? (
          <ListLoader text="Loading job workers..." />
        ) : jobWorkerList.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No job workers found.
          </p>
        ) : filteredJobWorkerList.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No job workers match your search.
          </p>
        ) : (
          filteredJobWorkerList.map((worker, index) => (
            <div
              key={worker.id}
              className="block w-xs border rounded-lg shadow-xs border-gray-300 dark:border-gray-600 bg-emerald-100 dark:bg-gray-800 p-4 relative"
            >
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleEdit(worker.id);
                  }}
                  className="border rounded-lg border-primary-700 cursor-pointer p-1"
                >
                  <PencilSimple
                    size={iconSpecifications.size}
                    color={iconSpecifications.colour}
                    weight={iconSpecifications.weight as any}
                  />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(worker.id);
                  }}
                  className="border rounded-lg border-red-700 cursor-pointer p-1"
                >
                  <Trash
                    size={iconSpecifications.size}
                    color={iconSpecifications.colour}
                    weight={iconSpecifications.weight as any}
                  />
                </button>
              </div>
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
                <span className="text-green-600">
                  {worker.status || "Active"}
                </span>
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
