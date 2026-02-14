import axios from "axios";

type GetCustomersApiType = {
  company_id?: string;
};

export const GetCustomersAPI = async ({
  company_id,
}: GetCustomersApiType) => {
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

    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    console.log(error);
    console.error("Failed to fetch customers:", error.code);

    return {
      success: false,
      error: error.response?.data?.error || "Network error",
    };
  }
};
