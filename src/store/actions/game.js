import { gameService } from '../../services/gameService'

export const setTurnPlayerIdx = (players, currPlayerIdx) => {
    return dispatch => {
        const playerIdx = gameService.getNextActivePlayerIdx(players, currPlayerIdx)
        dispatch({ type: 'SET_TURN_PLAYER_IDX', playerIdx })
    }
}


export const updatePlayer = (player, idx) => {
    return dispatch => dispatch({ type: 'UPDATE_PLAYER', player, idx })
}


export const updateCard = (level, cardState) => {
    return dispatch => dispatch({ type: 'UPDATE_CARD_STACK_BY_LEVEL', level, cardState })
}


export const buyingCard = (players, currPlayerIdx, card, levelCardState) => {
    return dispatch => {
        players = players.slice()
        const player = JSON.parse(JSON.stringify(players[currPlayerIdx]))

        // Add card to player ownCards
        player.ownCards.push(card)

        // Pay for card
        const coin = gameService.getCoinStatAfterPay(player.coin, card.cost)
        player.coin = coin

        // If card worth point - add them to player
        if (card.point) player.point += card.point

        // Add card's gem to fixed coin
        player.coin.fixed[card.gem] += 1
        dispatch(updatePlayer(player, currPlayerIdx))

        // Update cards
        const newCardState = gameService.getCardsStackAfterBuy(levelCardState, card)
        dispatch(updateCard(card.level, newCardState))
    }
}


export const coinPick = (player, currPlayerIdx, coinPick) => {
    return dispatch => {
        if (coinPick.gold) {
            player.coin.fluid.gold++
            player.coin.total.gold++
            dispatch(setTurnPhase(3))
        } else {
            Object.keys(coinPick.gem).forEach(gem => {
                if (!coinPick.gem[gem]) return

                player.coin.fluid.gem[gem] += coinPick.gem[gem]
                player.coin.total.gem[gem] += coinPick.gem[gem]
            })
            dispatch(setTurnPhase(1))
        }

        dispatch(updatePlayer(player, currPlayerIdx))
    }
}


export const gainNoble = (noble, player, noblesStack) => {
    return dispatch => {
        player.ownNobles.push(noble)
        player.point += 3
        dispatch({ type: 'PLAYER_GAIN_NOBLE', player })

        noblesStack = noblesStack.filter(nobleCard => nobleCard.id !== noble.id)
        dispatch({ type: 'SET_NOBLES', nobles: noblesStack })
    }
}


export const setTurnPhase = (phase) => dispatch => dispatch({ type: 'SET_TURN_PHASE', phase })