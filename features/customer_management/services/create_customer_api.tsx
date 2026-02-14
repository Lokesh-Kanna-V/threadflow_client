import axios from "axios";

type CreateCustomerType = {
  customer_details?: object;
};

export const CreateCustomerAPI = async ({
  customer_details,
}: CreateCustomerType) => {
  try {
    const response = await axios.post(
      "http://localhost:9000/customers/postCustomer",
      { customer_details },
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
    console.error("Failed to create customer:", error.code);

    return {
      success: false,
      error: error.response?.data?.error || "Network error",
    };
  }
};
