import { showMessage } from "../../utils";
import { setLoading } from "./global";

let url = `https://pokeapi.co/api/v2/pokemon?offset=24&limit=24`;

export const getDataPokemon = () => (dispatch) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      dispatch(setLoading(false));
      dispatch({ type: "SET_POKEMON", value: data.results });
    })
    .catch((err) => {
      showMessage(err || "Something Wrong");
      dispatch(setLoading(false));
    });
};
