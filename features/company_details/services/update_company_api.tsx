import axios from "axios";

type UpdateCompanyType = {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  gst?: string;
  logo_url?: string;
  type?: string;
  address_line_1?: string;
  address_line_2?: string;
  city?: string;
  state?: string;
};

export const UpdateCompanyAPI = async ({
  id,
  ...updateData
}: UpdateCompanyType) => {
  try {
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!baseURL) {
      throw new Error("Missing NEXT_PUBLIC_BACKEND_URL");
    }

    const response = await axios.put(
      `${baseURL}/company/updateCompany`,
      { id, ...updateData },
      {
        withCredentials: true,
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
    const errorCode = axios.isAxiosError(error) ? error.code : undefined;
    console.error("Failed to update company:", errorCode);

    return {
      success: false,
      error: axios.isAxiosError(error)
        ? error.response?.data?.error || "Network error"
        : "Network error",
    };
  }
};
