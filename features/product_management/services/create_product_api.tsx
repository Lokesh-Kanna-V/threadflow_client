import axios from "axios";

type CreateProductType = {
  product_detials?: object;
};

export const CreateProductAPI = async ({ product_detials }: CreateProductType) => {
  // setLoading(true);

  try {
    const response = await axios.post(
      "http://localhost:9000/product/postProduct",
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
  } catch (error: any) {
    // setLoading(false);
    console.log(error);
    // setShowAlert({ status: "error", message: error.code });
    console.error("Failed to fetch all work orders:", error.code);

    return {
      success: false,
      error: error.response?.data?.error || "Network error",
    };
  }
};
