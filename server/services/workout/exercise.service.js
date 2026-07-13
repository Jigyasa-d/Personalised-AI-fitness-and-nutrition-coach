import axios from "axios";

const BASE_URL = "https://wger.de/api/v2";

export const fetchExercises = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/exerciseinfo/?limit=100`
    );

    return response.data.results;
  } catch (error) {
    console.log("Exercise API Error");

    console.log(error.message);

    return [];
  }
};