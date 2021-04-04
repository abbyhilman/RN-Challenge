import { showMessage } from "../../utils";
import { setLoading } from "./global";


export const getDataPokemon = (limit, offset) => (dispatch) => {
  fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
    .then((response) => response.json())
    .then((data) => {
      dispatch({ type: "SET_POKEMON", value: data.results });
      dispatch(setLoading(false));
    })
    .catch((err) => {
      showMessage(err || "Something Wrong");
      dispatch(setLoading(false));
    });
};
