import axios from "axios";

export const getDetalhesPost = async (id) => {
  console.log("valor do voto", id);
  const response = await axios.get(
    `https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts/${id}`,
    {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    }
  );

  return response.data;
};
