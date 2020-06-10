import axios from "axios";

export const putVotar = async (body) => {
  console.log("valor do voto", body.direction);
  const response = await axios.put(
    `https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts/${body.id}/vote`,
    body,
    {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    }
  );

  return response.data;
};
