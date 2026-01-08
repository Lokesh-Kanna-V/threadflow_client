import axios from "axios";

type CreateOrderPayload = {
  orderDetails: {};
  itemDetails: any[];
};

export const CreateOrderApi = async (
  consolidatedItemDetails: CreateOrderPayload
) => {
  console.log("Consolidated item details:", consolidatedItemDetails);
  // setLoading(true);
  try {
    const response = await axios.post(
      "http://localhost:9000/workOrder/postWorkOrder",
      consolidatedItemDetails,
      {
        withCredentials: true, // <--- VERY IMPORTANT FOR SECURITY
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // setLoading(false);
    // setShowAlert({ status: "success", message: "success" });

    return {
      success: true,
      data: {
        dta: response.data,
      },
    };
  } catch (error: any) {
    // setLoading(false);
    console.log(error);
    // setShowAlert({ status: "error", message: error.code });
    console.error("Company Not Created:", error.code);

    return {
      success: false,
      error: error.response?.data?.error || "Network error",
    };
  }
};
