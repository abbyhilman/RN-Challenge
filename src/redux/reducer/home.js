const initHome = {
    pokemons: [],
    detailsPokemon: [],
}

export const homeReducer = (state = initHome, action) => {
    if (action.type === 'SET_POKEMON') {
        return {
            ...state,
            pokemons: action.value,
        }
    }
    return state;
}