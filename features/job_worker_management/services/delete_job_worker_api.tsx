import axios from "axios";

type DeleteJobWorkerType = {
  id: string;
};

export const DeleteJobWorkerAPI = async ({ id }: DeleteJobWorkerType) => {
  try {
    const response = await axios.delete(
      "http://localhost:9000/jobWorker/deleteJobWorker",
      {
        data: { id },
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
    console.error("Failed to delete job worker:", error.code);

    return {
      success: false,
      error: error.response?.data?.error || "Network error",
    };
  }
};
