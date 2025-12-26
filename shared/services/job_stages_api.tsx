import axios from "axios";

export const jobStageApi = async () => {
  try {
    const response = await axios.get(
      "http://localhost:9000/jobStage/getAllStages",
      {
        withCredentials: true, // <--- VERY IMPORTANT FOR SECURITY
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return {
      success: true,
      data: {
        stages: response.data.stages,
      },
    };
  } catch (error: any) {
    console.log(error);

    return {
      success: false,
      error: error.response?.data?.error || "Network error",
    };
  }
};
