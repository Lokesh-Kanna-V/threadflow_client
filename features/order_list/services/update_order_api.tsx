import axios from "axios";

type UpdateOrderPayload = {
  id: string;
  orderDetails: {};
  itemDetails?: any[];
};

export const UpdateOrderAPI = async (payload: UpdateOrderPayload) => {
  try {
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!baseURL) {
      throw new Error("Missing NEXT_PUBLIC_BACKEND_URL");
    }

    const response = await axios.put(
      `${baseURL}/workOrder/updateWorkOrder`,
      payload,
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
    console.error("Failed to update work order:", errorCode);

    return {
      success: false,
      error: axios.isAxiosError(error)
        ? error.response?.data?.error || "Network error"
        : "Network error",
    };
  }
};
