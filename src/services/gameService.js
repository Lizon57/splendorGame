import { utilService } from './utilService'

import { dummyGameDB } from '../data/dummyGameDB'


async function getById(id) {
    const [game] = dummyGameDB.filter(game => game._id === id)

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
    const playerCoinConcated = utilService.concatTwoNumObj(playerCoin.fluid.gem, playerCoin.fixed)
    let goldNeeded = 0

    Object.keys(cost).forEach(gemCost => {
        if (playerCoinConcated[gemCost] < cost[gemCost]) goldNeeded += -(playerCoinConcated[gemCost] - cost[gemCost])
    })

    if ((!goldNeeded) || (playerCoin.fluid.gold > goldNeeded)) return true
    return false
}


function getNextActivePlayerIdx(players, playerTrnIdx) {
    let nextActivePlayerIdx = -1

    if (playerTrnIdx === 0) {
        const slicedPlayers = players.slice(1)
        nextActivePlayerIdx = slicedPlayers.findIndex(player => player.isActive === true) + 1
    }

    else if (playerTrnIdx === 1) {
        const slicedPlayers = players.slice(2)
        nextActivePlayerIdx = slicedPlayers.findIndex(player => player.isActive === true) + 2
        console.log(nextActivePlayerIdx)

        if (nextActivePlayerIdx === -1 && players[0].isActive) nextActivePlayerIdx = 0
    }

    else if (playerTrnIdx === 2) {
        if (players[3]?.isActive) nextActivePlayerIdx = 3
        else {
            const slicedPlayers = players.slice(0, 1)
            nextActivePlayerIdx = slicedPlayers.findIndex(player => player.isActive === true)
        }
    }

    else {
        const slicedPlayers = players.slice(0, 3)
        nextActivePlayerIdx = slicedPlayers.findIndex(player => player.isActive === true)
    }

    return nextActivePlayerIdx
}


function getCardsStackAfterBuy(cards, boughtCard) {
    const newStack = JSON.parse(JSON.stringify(cards))
    const drawnCardIdx = utilService.getRandomInt(0, newStack.cardsStack.length)
    const boughtCardIdx = newStack.shownCards.findIndex(card => card.id === boughtCard.id)
    const drawnCard = newStack.cardsStack.splice(drawnCardIdx, 1)[0]
    newStack.shownCards[boughtCardIdx] = drawnCard
    return newStack
}



export const gameService = {
    getById,
    isPlayerAbleBuyCard,
    getNextActivePlayerIdx,
    getCardsStackAfterBuy
}