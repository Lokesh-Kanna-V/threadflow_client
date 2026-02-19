import axios from "axios";

type DeleteProductType = {
  id: string;
};

export const DeleteProductAPI = async ({ id }: DeleteProductType) => {
  try {
    const response = await axios.delete(
      "http://localhost:9000/product/deleteProduct",
      {
        data: { id },
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
    console.error("Failed to delete product:", error.code);

    return {
      success: false,
      error: error.response?.data?.error || "Network error",
    };
  }
};
