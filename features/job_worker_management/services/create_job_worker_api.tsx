import axios from "axios";

type CreateJobWorkerType = {
  job_worker_details?: object;
};

export const CreateJobWorkerAPI = async ({
  job_worker_details,
}: CreateJobWorkerType) => {
  try {
    const response = await axios.post(
      "http://localhost:9000/jobWorker/postJobWorker",
      { job_worker_details },
      {
        withCredentials: true, // <--- VERY IMPORTANT FOR SECURITY
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    console.log(error);
    console.error("Failed to create job worker:", error.code);

    return {
      success: false,
      error: error.response?.data?.error || "Network error",
    };
  }
};
