import { utilService } from './utilService'

import { dummyGameDB } from '../data/dummyGameDB'


async function getById(id) {
    const game = dummyGameDB.find(game => game._id === id)
    if (!game) throw 'Game not found'

    // For debugging: 
    // Resolve after delay
    // return new Promise(res => {
    //     setTimeout(() => res(game), 2000)
    // })

    // Reject:
    // throw 'Initiated error'

    // All fixed behavior:
    return game
}


function isPlayerAbleBuyCard(cost, playerCoin) {
    let goldNeeded = 0
    Object.keys(cost).forEach(gemCost => {
        const costDiff = playerCoin.gem[gemCost] - cost[gemCost]
        if (costDiff < 0) goldNeeded -= costDiff
    })

    if (!goldNeeded || playerCoin.gold > goldNeeded) return true
    return false
}


function getNextActivePlayerIdx(players, currPlayerTurnIdx) {
    let nextActivePlayerIdx = -1

    switch (currPlayerTurnIdx) {
        case 0:
            nextActivePlayerIdx = players.findIndex((player, idx) => idx !== 0 && player.isActive)
            break

        case 1:
            nextActivePlayerIdx = players.findIndex((player, idx) => idx > 1 && player.isActive)
            if ((nextActivePlayerIdx === -1) && players[0].isActive) nextActivePlayerIdx = 0
            break

        case 2:
            if (players[3].isActive) nextActivePlayerIdx = 3
            else if (players[0].isActive) nextActivePlayerIdx = 0
            else if (players[1].isActive) nextActivePlayerIdx = 1
            break

        case 3:
            nextActivePlayerIdx = players.findIndex((player, idx) => idx < 3 && player.isActive)
            break

        default: return
    }

    return nextActivePlayerIdx
}


function getCoinStatAfterPay(coin, cost) {
    Object.keys(cost).forEach(gemCost => {
        const neededFluid = (coin.fixed[gemCost] - cost[gemCost]) * -1
        if (neededFluid <= 0) return

        const goldNeeded = (coin.fluid.gem[gemCost] - neededFluid) * -1
        if (goldNeeded > 0) {
            coin.total.gold -= goldNeeded
            coin.fluid.gold -= goldNeeded
            coin.total.gem[gemCost] = coin.fixed[gemCost]
            coin.fluid.gem[gemCost] = 0
            return
        }

        coin.total.gem[gemCost] -= neededFluid
        coin.fluid.gem[gemCost] -= neededFluid
    })

    return coin
}


function getCardsStackAfterBuy(cardState, boughtCard) {
    cardState = JSON.parse(JSON.stringify(cardState))

    const drawnCardIdx = utilService.getRandomInt(0, cardState.cardsStack.length)
    const boughtCardIdx = cardState.shownCards.findIndex(card => card.id === boughtCard.id)
    const drawnCard = cardState.cardsStack.splice(drawnCardIdx, 1)[0]
    cardState.shownCards[boughtCardIdx] = drawnCard

    return cardState
}



export const gameService = {
    getById,
    isPlayerAbleBuyCard,
    getNextActivePlayerIdx,
    getCardsStackAfterBuy,
    getCoinStatAfterPay
}