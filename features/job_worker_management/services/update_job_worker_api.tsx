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
  job_stage_id?: string[];
};

export const UpdateJobWorkerAPI = async ({
  id,
  ...updateData
}: UpdateJobWorkerType) => {
  try {
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!baseURL) {
      throw new Error("Missing NEXT_PUBLIC_BACKEND_URL");
    }

    const response = await axios.put(
      `${baseURL}/jobWorker/updateJobWorker`,
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
  } catch (error: unknown) {
    console.log(error);
    const errorCode = axios.isAxiosError(error) ? error.code : undefined;
    console.error("Failed to update job worker:", errorCode);

    return {
      success: false,
      error: axios.isAxiosError(error)
        ? error.response?.data?.error || "Network error"
        : "Network error",
    };
  }
};
