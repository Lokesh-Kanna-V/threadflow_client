import axios from "axios";

type CreateCompanyType = {
  companyData: {
    name: string;
    email: string;
    phone: string;
    gst: string;
    logo_url: string;
    type: string;
    address_line_1: string;
    address_line_2: string;
    city: string;
    state: string;
  };
};

export const createCompany = async ({ companyData }: CreateCompanyType) => {
  try {
    const response = await axios.post(
      "http://localhost:9000/company/postCompany",
      companyData,
      {
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
    console.error("Company Not Created:", error);

    return {
      success: false,
      error: error.response?.data?.error || "Network error",
    };
  }
};
