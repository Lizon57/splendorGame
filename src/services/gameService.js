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



export const gameService = {
    getById,
    isPlayerAbleBuyCard
}