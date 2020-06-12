import axios from "axios";

let token = localStorage.getItem('token')

if (token === null) {
  token = sessionStorage.getItem('token')
}

export const postCriarPost = async (body) => {
  const response = await axios.post(
    `https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts`,
    body,
    {
      headers: {
        authorization: token,
      },
    }
  );
  console.log("consegui", response);
  return response.data;
};
