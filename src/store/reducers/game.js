const initialState = {
    game: {}
}


export function game(state = initialState, action) {
    switch (action.type) {
        case 'SET_GAME':
            return { ...state, game: action.payload }

        default: return state
    }
}
