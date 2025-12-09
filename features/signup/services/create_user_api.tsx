import axios from "axios";

type CreateUserType = {
  userData: object;
};

export const createUser = async ({ userData }: CreateUserType) => {
  try {
    const response = await axios.post(
      "http://localhost:9000/user/postUser",
      userData,
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
