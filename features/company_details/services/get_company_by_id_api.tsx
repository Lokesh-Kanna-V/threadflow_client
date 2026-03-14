import axios from "axios";

type GetCompanyByIdApiType = {
  id: string;
};

export const GetCompanyByIdAPI = async ({ id }: GetCompanyByIdApiType) => {
  try {
    const response = await axios.post(
      "http://localhost:9000/company/getCompanyById",
      { id },
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
    console.error("Failed to fetch company:", error?.code);

    return {
      success: false,
      error: error.response?.data?.error || "Network error",
    };
  }
};
