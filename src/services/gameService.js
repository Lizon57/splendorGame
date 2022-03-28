import { dummyGamesDB } from '../data/dummyGamesDB'

async function getById(id) {
    const game = dummyGamesDB.filter(game => game._id === id)

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




export const gameService = {
    getById
}