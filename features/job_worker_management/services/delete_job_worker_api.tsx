import axios from "axios";

type DeleteJobWorkerType = {
  id: string;
};

export const DeleteJobWorkerAPI = async ({ id }: DeleteJobWorkerType) => {
  try {
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!baseURL) {
      throw new Error("Missing NEXT_PUBLIC_BACKEND_URL");
    }

    const response = await axios.delete(
      `${baseURL}/jobWorker/deleteJobWorker`,
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
  } catch (error: unknown) {
    console.log(error);
    const errorCode = axios.isAxiosError(error) ? error.code : undefined;
    console.error("Failed to delete job worker:", errorCode);

    return {
      success: false,
      error: axios.isAxiosError(error)
        ? error.response?.data?.error || "Network error"
        : "Network error",
    };
  }
};
