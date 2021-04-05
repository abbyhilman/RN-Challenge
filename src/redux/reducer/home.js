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
    if (action.type === 'SET_DETAIL') {
        return {
            ...state,
            detailsPokemon: action.value,
        }
    }
    return state;
}