const initialState = {
    game: {}
}


export function game(state = initialState, action) {
    switch (action.type) {
        case 'SET_GAME':
            return { ...state, game: action.payload }

        case 'SET_COIN_PICK':
            const newGame = { ...state.game }
            newGame.turn.phase = 1
            newGame.coinStack = {
                gem: action.payload.stack.gem,
                gold: action.payload.stack.gold
            }
            newGame.players[state.game.turn.playerIdx].coin = { ...action.payload.pickedCoin }
            return { ...state, ...newGame }

        default: return state
    }
}
