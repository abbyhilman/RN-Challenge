import { showMessage } from "../../utils";
import { setLoading } from "./global";
import axios from "axios";

export const getDataPokemon = (limit, offset) => (dispatch) => {
  axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
    .then((response) => {
      dispatch({ type: "SET_POKEMON", value: response.data.results });
      dispatch(setLoading(false));
    })
    .catch((err) => {
      showMessage(err || "Something Wrong");
      dispatch(setLoading(false));
    });
};

export const getDetailPokemon = (name) => (dispatch) => {
  axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then((response) => {
      dispatch({type: "SET_DETAIL", value: response.data});
      dispatch(setLoading(false));
    })
    .catch((err) => {
      showMessage(err || "Something Wrong");
      dispatch(setLoading(false));
    })
}
