import axios from "axios";


export const GetAllWoListAPI = async () => {
  // setLoading(true);

  try {
    const response = await axios.get(
      "http://localhost:9000/workOrder/getAllWorkOrders",
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
      data: response.data,
    };
  } catch (error: any) {
    // setLoading(false);
    console.log(error);
    // setShowAlert({ status: "error", message: error.code });
    console.error("Failed to fetch all work orders:", error.code);

    return {
      success: false,
      error: error.response?.data?.error || "Network error",
    };
  }
};
