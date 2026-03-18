import axios from "axios";

type DeleteOrderType = {
  id: string;
};

export const DeleteOrderAPI = async ({ id }: DeleteOrderType) => {
  try {
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!baseURL) {
      throw new Error("Missing NEXT_PUBLIC_BACKEND_URL");
    }

    const response = await axios.delete(
      `${baseURL}/workOrder/deleteWorkOrder`,
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
    console.error("Failed to delete work order:", errorCode);

    return {
      success: false,
      error: axios.isAxiosError(error)
        ? error.response?.data?.error || "Network error"
        : "Network error",
    };
  }
};
