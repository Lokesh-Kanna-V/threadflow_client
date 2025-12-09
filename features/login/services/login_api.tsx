import axios from "axios";

type UserLoginType = {
  email?: string;
  phone?: string;
  password: string;
  setLoading: (value: boolean) => void;
  setShowAlert: (value: { status: string; message: string }) => void;
};

export const UserLogin = async ({
  email,
  phone,
  password,
  setLoading,
  setShowAlert,
}: UserLoginType) => {
  setLoading(true);
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

    setLoading(false);
    setShowAlert({ status: "success", message: "success" });

    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    setLoading(false);
    console.log(error);
    setShowAlert({ status: "error", message: error.code });
    console.error("Company Not Created:", error.code);

    return {
      success: false,
      error: error.response?.data?.error || "Network error",
    };
  }
};
