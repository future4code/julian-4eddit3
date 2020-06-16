import axios from "axios";

export const postLogin = async (body) => {
  const response = await axios.post(
    `https://us-central1-labenu-apis.cloudfunctions.net/labEddit/login`,
    body
  );

  return response.data;
};
