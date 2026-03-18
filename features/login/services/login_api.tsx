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
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!baseURL) {
      throw new Error("Missing NEXT_PUBLIC_BACKEND_URL");
    }

    const response = await axios.post(
      `${baseURL}/user/login`,
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

    localStorage.setItem("cid", response.data.user.company_id);

    return {
      success: true,
      data: {
        accessToken: response.data.accessToken,
        user: response.data.user,
      },
    };
  } catch (error: unknown) {
    setLoading(false);
    console.log(error);
    const errorMessage = axios.isAxiosError(error)
      ? error.code ?? "Request failed"
      : error instanceof Error
        ? error.message
        : "Request failed";
    setShowAlert({ status: "error", message: errorMessage });
    console.error("Company Not Created:", errorMessage);

    return {
      success: false,
      error: axios.isAxiosError(error)
        ? error.response?.data?.error || "Network error"
        : "Network error",
    };
  }
};
