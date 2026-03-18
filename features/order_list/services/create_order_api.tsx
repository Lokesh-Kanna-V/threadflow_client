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
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!baseURL) {
      throw new Error("Missing NEXT_PUBLIC_BACKEND_URL");
    }

    const response = await axios.post(
      `${baseURL}/workOrder/postWorkOrder`,
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
  } catch (error: unknown) {
    // setLoading(false);
    console.log(error);
    // setShowAlert({ status: "error", message: error.code });
    const errorCode = axios.isAxiosError(error) ? error.code : undefined;
    console.error("Company Not Created:", errorCode);

    return {
      success: false,
      error: axios.isAxiosError(error)
        ? error.response?.data?.error || "Network error"
        : "Network error",
    };
  }
};
