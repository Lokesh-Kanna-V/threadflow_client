import axios from "axios";

type UpdateJobWorkerType = {
  id: string;
  name?: string;
  contact?: string;
  contact_person?: string;
  phone?: string;
  email?: string;
  address?: string;
  status?: string;
};

export const UpdateJobWorkerAPI = async ({
  id,
  ...updateData
}: UpdateJobWorkerType) => {
  try {
    const response = await axios.put(
      "http://localhost:9000/jobWorker/updateJobWorker",
      { id, ...updateData },
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
    console.error("Failed to update job worker:", error.code);

    return {
      success: false,
      error: error.response?.data?.error || "Network error",
    };
  }
};
