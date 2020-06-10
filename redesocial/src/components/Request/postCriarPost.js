import axios from "axios";

export const postCriarPost = async (body) => {
  const response = await axios.post(
    `https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts`,
    body,
    {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    }
  );
  console.log("consegui", response);
  return response.data;
};
