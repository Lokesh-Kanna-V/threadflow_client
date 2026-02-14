import axios from "axios";

type GetJobWorkersApiType = {
  company_id?: string;
};

export const GetJobWorkersAPI = async ({
  company_id,
}: GetJobWorkersApiType) => {
  try {
    const response = await axios.post(
      "http://localhost:9000/jobWorker/getJobWorkersByCompany",
      { company_id },
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
    console.error("Failed to fetch job workers:", error.code);

    return {
      success: false,
      error: error.response?.data?.error || "Network error",
    };
  }
};
