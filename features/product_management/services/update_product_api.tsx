import axios from "axios";

type UpdateProductType = {
  id: string;
  name?: string;
  description?: string;
  sku?: string;
  hsn_code?: string;
};

export const UpdateProductAPI = async ({
  id,
  ...updateData
}: UpdateProductType) => {
  try {
    const response = await axios.put(
      "http://localhost:9000/product/updateProduct",
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
    console.error("Failed to update product:", error.code);

    return {
      success: false,
      error: error.response?.data?.error || "Network error",
    };
  }
};
