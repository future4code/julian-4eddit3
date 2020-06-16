import axios from "axios";

let token = localStorage.getItem("token");

if (token === null) {
  token = sessionStorage.getItem("token");
}

export const getDetalhesPost = async (id) => {
  const response = await axios.get(
    `https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );

  return response.data;
};
