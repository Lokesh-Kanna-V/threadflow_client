import axios from "axios";

type GetOrderByIdType = {
  id: string;
};

export const GetOrderByIdAPI = async ({ id }: GetOrderByIdType) => {
  try {
    const response = await axios.post(
      "http://localhost:9000/workOrder/getWorkOrderById",
      { id },
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
    console.error("Failed to fetch work order:", error.code);

    return {
      success: false,
      error: error.response?.data?.error || "Network error",
    };
  }
};
