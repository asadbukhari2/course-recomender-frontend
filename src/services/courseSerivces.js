import Axios from "../axios-request";

export const fetchCourses = async () => {
  return Axios.get("courses").then((response) => {
    return response.data;
  });
};
