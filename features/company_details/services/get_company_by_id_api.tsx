import axios from "axios";

type GetCompanyByIdApiType = {
  id: string;
};

export const GetCompanyByIdAPI = async ({ id }: GetCompanyByIdApiType) => {
  try {
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!baseURL) {
      throw new Error("Missing NEXT_PUBLIC_BACKEND_URL");
    }

    const response = await axios.post(
      `${baseURL}/company/getCompanyById`,
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
  } catch (error: unknown) {
    const errorCode = axios.isAxiosError(error) ? error.code : undefined;
    console.error("Failed to fetch company:", errorCode);

    return {
      success: false,
      error: axios.isAxiosError(error)
        ? error.response?.data?.error || "Network error"
        : "Network error",
    };
  }
};
