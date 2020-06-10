import axios from "axios";

export const getPosts = async () => {
  const response = await axios.get(
    `https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts`,
    {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    }
  );

  return response.data.posts;
};
