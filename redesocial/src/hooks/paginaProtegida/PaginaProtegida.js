import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export const usePaginaProtegida = () => {
  const history = useHistory();

  const token = localStorage.getItem("token");
  const tokenSessao = sessionStorage.getItem("token")

  useEffect(() => {

    if (token === null && tokenSessao === null) {
      history.push("/Login");
    }
  }, [history]);
};

export default usePaginaProtegida;
