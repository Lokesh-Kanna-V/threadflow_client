import axios from "axios";

type UpdateCustomerType = {
  id: string;
  name?: string;
  contact?: string;
  address?: string;
};

export const UpdateCustomerAPI = async ({
  id,
  ...updateData
}: UpdateCustomerType) => {
  try {
    const response = await axios.put(
      "http://localhost:9000/customers/updateCustomer",
      { id, ...updateData },
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
    console.error("Failed to update customer:", error.code);

    return {
      success: false,
      error: error.response?.data?.error || "Network error",
    };
  }
};
