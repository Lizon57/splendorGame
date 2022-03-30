import { utilService } from '../../services/utilService'
import { gameService } from '../../services/gameService'


const initialState = {
    game: {}
}


export function game(state = initialState, action) {
    const newGame = { ...state.game }
    let currPlayer

    switch (action.type) {

        case 'SET_GAME':
            return { ...state, game: action.payload }


        case 'SET_COIN_PICK':
            currPlayer = newGame.players[state.game.turn.playerIdx]

            newGame.turn.phase = 1
            newGame.coinStack = {
                gem: action.payload.stack.gem,
                gold: action.payload.stack.gold
            }
            currPlayer.coin.fluid.gem = utilService.concatTwoNumObj(action.payload.pickedCoin.gem, currPlayer.coin.fluid.gem)

            if (action.payload.pickedCoin.gold) {
                currPlayer.coin.fluid.gold += action.payload.pickedCoin.gold
            }

            return { ...state, ...newGame }


        case 'BUY_CARD':
            currPlayer = newGame.players[state.game.turn.playerIdx]

            newGame.turn.phase = 0
            const nexPlayerTrnIdx = gameService.getNextActivePlayerIdx(newGame.players, state.game.turn.playerIdx)
            if (nexPlayerTrnIdx !== -1) newGame.turn.playerIdx = nexPlayerTrnIdx

            currPlayer.ownCards.push(action.payload)

            if (action.payload.point) currPlayer.point += action.payload.point

            currPlayer.coin.fixed[action.payload.gem] += 1

            const newCardPackage = gameService.getCardsStackAfterBuy(newGame.card[action.payload.level], action.payload)

            newGame.card[action.payload.level] = newCardPackage

            return { ...state, ...newGame }


        case 'SKIP_TURN':
            newGame.turn.phase = 0
            const x = gameService.getNextActivePlayerIdx(newGame.players, state.game.turn.playerIdx)
            console.log(x)
            if (x !== -1) newGame.turn.playerIdx = x


        default: return state
    }
}
