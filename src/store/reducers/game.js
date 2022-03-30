const initialState = {
    game: {}
}


export function game(state = initialState, action) {
    const newGame = { ...state.game }

    switch (action.type) {
        case 'SET_GAME':
            return { ...state, game: action.payload }


        case 'UPDATE_PLAYER':
            newGame.players[action.idx] = action.player
            return { ...state, game: newGame }


        case 'SET_TURN_PLAYER_IDX':
            newGame.turn.playerIdx = action.playerIdx
            newGame.turn.phase = 0
            return { ...state, game: newGame }


        case 'UPDATE_CARD_STACK_BY_LEVEL':
            newGame.card[action.level] = action.cardState
            return { ...state, game: newGame }


        case 'PLAYER_GAIN_NOBLE':
            newGame.players[newGame.turn.playerIdx] = action.player
            return { ...state, game: newGame }

        case 'SET_NOBLES':
            newGame.nobles = action.nobles
            return { ...state, game: newGame }


        default: return state
    }
}
