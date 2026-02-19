import axios from "axios";

type UpdateOrderPayload = {
  id: string;
  orderDetails: {};
  itemDetails?: any[];
};

export const UpdateOrderAPI = async (payload: UpdateOrderPayload) => {
  try {
    const response = await axios.put(
      "http://localhost:9000/workOrder/updateWorkOrder",
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
  } catch (error: any) {
    console.log(error);
    console.error("Failed to update work order:", error.code);

    return {
      success: false,
      error: error.response?.data?.error || "Network error",
    };
  }
};
