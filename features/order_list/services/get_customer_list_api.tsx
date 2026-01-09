import axios from "axios";

type GetCustomersType = {
  company_id?: string;
};

export const GetCustomersAPI = async ({ company_id }: GetCustomersType) => {
  // setLoading(true);

  try {
    const response = await axios.post(
      "http://localhost:9000/customers/getCustomersByCompanyId",
      { company_id },
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
    console.error("Company Not Created:", error.code);

    return {
      success: false,
      error: error.response?.data?.error || "Network error",
    };
  }
};
