import axios from "axios";

type DeleteCustomerType = {
  id: string;
};

export const DeleteCustomerAPI = async ({ id }: DeleteCustomerType) => {
  try {
    const response = await axios.delete(
      "http://localhost:9000/customers/deleteCustomer",
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
    console.error("Failed to delete customer:", error.code);

    return {
      success: false,
      error: error.response?.data?.error || "Network error",
    };
  }
};
