import axios from "axios";

let token = localStorage.getItem('token')

if (token === null) {
  token = sessionStorage.getItem('token')
}

export const postCriarComentario = async (body) => {
  const response = await axios.post(
    `https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts/${body.id}/comment`,
    body,
    {
      headers: {
        authorization: token,
      },
    }
  );

  return response.data;
};
