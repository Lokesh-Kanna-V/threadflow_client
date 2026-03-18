import axios from "axios";

type CreateProductType = {
  product_detials?: object;
};

export const CreateProductAPI = async ({ product_detials }: CreateProductType) => {
  // setLoading(true);

  try {
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!baseURL) {
      throw new Error("Missing NEXT_PUBLIC_BACKEND_URL");
    }

    const response = await axios.post(
      `${baseURL}/product/postProduct`,
      { product_detials },
      {
        withCredentials: true, // <--- VERY IMPORTANT FOR SECURITY
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // setLoading(false);
    // setShowAlert({ status: "success", message: "success" });

    return {
      success: true,
      data: response.data,
    };
  } catch (error: unknown) {
    // setLoading(false);
    console.log(error);
    // setShowAlert({ status: "error", message: error.code });
    const errorCode = axios.isAxiosError(error) ? error.code : undefined;
    console.error("Failed to fetch all work orders:", errorCode);

    return {
      success: false,
      error: axios.isAxiosError(error)
        ? error.response?.data?.error || "Network error"
        : "Network error",
    };
  }
};
