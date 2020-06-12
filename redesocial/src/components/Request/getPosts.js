import axios from "axios";

let token = localStorage.getItem('token')

if(token === null){
  token = sessionStorage.getItem('token')
}

export const getPosts = async () => {
  const response = await axios.get(
    `https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts`,
    {
      headers: {
        authorization: token,
      },
    }
  );

  return response.data.posts;
};
