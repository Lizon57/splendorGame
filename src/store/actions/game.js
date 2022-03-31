import { gameService } from '../../services/gameService'

export const setNextPlayerTurn = (players, currTurnPlayerIdx) => {
    return dispatch => {
        const playerIdx = gameService.getNextActivePlayerIdx(players, currTurnPlayerIdx)
        dispatch({ type: 'SET_NEXT_PLAYER_TURN', playerIdx })
    }
}


export const updatePlayer = (player, playerIdx) => dispatch => dispatch({ type: 'UPDATE_PLAYER', player, playerIdx })


export const updateCard = (level, cardState) => dispatch => dispatch({ type: 'UPDATE_CARD_STACK_BY_LEVEL', level, cardState })


export const buyingCard = (players, currTurnPlayerIdx, card, levelCardState) => {
    return dispatch => {
        const player = JSON.parse(JSON.stringify(players[currTurnPlayerIdx]))

        // Add card to player ownCards
        player.ownCards.push(card)

        // Pay for card
        const coin = gameService.getCoinStatAfterPay(player.coin, card.cost)
        player.coin = coin

        // If card worth point - add them to player
        if (card.point) player.point += card.point

        // Add card's gem to fixed coin
        player.coin.fixed[card.gem] += 1

        // Update cards (stack and saved)
        if (levelCardState) {
            const newCardState = gameService.getCardsStackAfterBuy(levelCardState, card)
            dispatch(updateCard(card.level, newCardState))
        } else {
            player.savedCards = player.savedCards.filter(savedCard => savedCard.id !== card.id)
        }

        dispatch(updatePlayer(player, currTurnPlayerIdx))

        // Set next player turn
        dispatch(setNextPlayerTurn(players, currTurnPlayerIdx))
    }
}


export const gemPick = (players, currTurnPlayerIdx, pickedGem, coinStack) => {
    const player = players[currTurnPlayerIdx]

    return dispatch => {
        Object.keys(pickedGem).forEach(gem => {
            if (!pickedGem[gem]) return

            player.coin.fluid.gem[gem] += pickedGem[gem]
            player.coin.total.gem[gem] += pickedGem[gem]
        })

        dispatch(updatePlayer(player, currTurnPlayerIdx))
        dispatch(setNextPlayerTurn(players, currTurnPlayerIdx))
        dispatch(updateCoinStack(coinStack))
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


export const gainGold = (player, currTurnPlayerIdx, coinStack) => {
    return dispatch => {
        if (!coinStack.gold) return

        player.coin.fluid.gold++
        player.coin.total.gold++
        dispatch(updatePlayer(player, currTurnPlayerIdx))

        coinStack.gold--
        dispatch(updateCoinStack(coinStack))
    }
}


export const updateCoinStack = coinStack => dispatch => dispatch({ type: 'UPDATE_COIN_STACK', coinStack })


export const savingCard = (players, currTurnPlayerIdx, card, levelCardState) => {
    return dispatch => {
        players = players.slice()
        const player = JSON.parse(JSON.stringify(players[currTurnPlayerIdx]))

        // Update cards
        const newCardState = gameService.getCardsStackAfterBuy(levelCardState, card)
        dispatch(updateCard(card.level, newCardState))

        // Add card to player saved cards
        player.savedCards.push(card)
        dispatch(updatePlayer(player, currTurnPlayerIdx))

        // Set next player turn
        dispatch(setNextPlayerTurn(players, currTurnPlayerIdx))
    }
}