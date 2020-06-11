import axios from "axios";

export const postCriarComentario = async (body) => {
  const response = await axios.post(
    `https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts/${body.id}/comment`,
    body,
    {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    }
  );

  return response.data;
};
