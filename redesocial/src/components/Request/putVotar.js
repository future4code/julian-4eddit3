import axios from "axios";

let token = localStorage.getItem("token");

if (token === null) {
  token = sessionStorage.getItem("token");
}

export const putVotar = async (body) => {
  const response = await axios.put(
    `https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts/${body.id}/vote`,
    body,
    {
      headers: {
        authorization: token,
      },
    }
  );

  return response.data;
};
