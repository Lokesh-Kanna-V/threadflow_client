import axios from "axios";

type UserLoginType = {
  email?: string;
  phone?: string;
  password: string;
};

export const UserLogin = async ({ email, phone, password }: UserLoginType) => {
  console.log({ phone, password });
  try {
    const response = await axios.post(
      "http://localhost:9000/user/login",
      { email: email, password: password },
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
