import axios from "axios";

type UserLoginType = {
  email?: string;
  phone?: string;
  password: string;
  setLoading: (value: boolean) => void;
  setShowAlert: (value: { status: string; message: string }) => void;
  setAccessToken?: any;
  setUser?: any;
};

export const UserLogin = async ({
  email,
  phone,
  password,
  setLoading,
  setShowAlert,
  setAccessToken,
  setUser,
}: UserLoginType) => {
  setLoading(true);
  try {
    const response = await axios.post(
      "http://localhost:9000/user/login",
      { email, password },
      {
        withCredentials: true, // <--- VERY IMPORTANT FOR SECURITY
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    setLoading(false);
    setShowAlert({ status: "success", message: "success" });

    // Store in-memory
    setAccessToken(response.data.accessToken);
    setUser(response.data.user);

    return {
      success: true,
      data: {
        accessToken: response.data.accessToken,
        user: response.data.user,
      },
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
