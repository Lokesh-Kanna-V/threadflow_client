import axios from "axios";

type getProductsApiType = {
  company_id: string
}

export const getProductsApi = async ({ company_id }: getProductsApiType) => {
  try {
    const response = await axios.post(
      "http://localhost:9000/product/getProductsByCompany",
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

    return {
      success: false,
      error: error.response?.data?.error || "Network error",
    };
  }
};
