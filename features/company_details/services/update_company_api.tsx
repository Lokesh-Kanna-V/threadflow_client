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
    const response = await axios.put(
      "http://localhost:9000/company/updateCompany",
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
  } catch (error: any) {
    console.error("Failed to update company:", error?.code);

    return {
      success: false,
      error: error.response?.data?.error || "Network error",
    };
  }
};
