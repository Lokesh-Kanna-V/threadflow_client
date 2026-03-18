import axios from "axios";

type UpdateCustomerType = {
  id: string;
  name?: string;
  phone?: string;
  email?: string;
  billing_address?: string;
  shipping_address?: string;
  gst?: string;
};

export const UpdateCustomerAPI = async ({
  id,
  ...updateData
}: UpdateCustomerType) => {
  try {
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!baseURL) {
      throw new Error("Missing NEXT_PUBLIC_BACKEND_URL");
    }

    const response = await axios.put(
      `${baseURL}/customers/updateCustomer`,
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
  } catch (error: unknown) {
    console.log(error);
    const errorCode = axios.isAxiosError(error) ? error.code : undefined;
    console.error("Failed to update customer:", errorCode);

    return {
      success: false,
      error: axios.isAxiosError(error)
        ? error.response?.data?.error || "Network error"
        : "Network error",
    };
  }
};
