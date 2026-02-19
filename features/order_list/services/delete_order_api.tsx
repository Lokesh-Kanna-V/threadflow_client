import axios from "axios";

type DeleteOrderType = {
  id: string;
};

export const DeleteOrderAPI = async ({ id }: DeleteOrderType) => {
  try {
    const response = await axios.delete(
      "http://localhost:9000/workOrder/deleteWorkOrder",
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
    console.error("Failed to delete work order:", error.code);

    return {
      success: false,
      error: error.response?.data?.error || "Network error",
    };
  }
};
