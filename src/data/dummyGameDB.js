import { utilService } from '../services/utilService'

import { firstLevelDevCards } from './card/firstLevelDevCards'
import { secondLevelDevCards } from './card/secondLevelDevCards'
import { thirdLevelDevCards } from './card/thirdLevelDevCards'


export const dummyGameDB = [
    {
        _id: 'gameI0001',


        turn: {
            playerIdx: 0,
            phase: 0,
        },


        coinStack: {
            gem: { emerald: 4, sapphire: 4, ruby: 4, diamond: 4, onyx: 4 },
            gold: 5,
        },

        card: {
            firstLevel: {
                cardsStack: firstLevelDevCards.slice(3),
                shownCards: [
                    {
                        id: utilService.makeId(),
                        point: 0,
                        gem: 'onyx',
                        cost: { sapphire: 2, ruby: 1, diamond: 2 }
                    },
                    {
                        id: utilService.makeId(),
                        point: 0,
                        gem: 'ruby',
                        cost: { emerald: 1, sapphire: 1, diamond: 1, onyx: 1 }
                    },
                    {
                        id: utilService.makeId(),
                        point: 0,
                        gem: 'emerald',
                        cost: { sapphire: 1, ruby: 2, onyx: 2 }
                    },
                    {
                        id: utilService.makeId(),
                        point: 0,
                        gem: 'onyx',
                        cost: { emerald: 3 }
                    }
                ]
            },
            secondLevel: {
                cardsStack: secondLevelDevCards.slice(3),
                shownCards: [
                    {
                        id: utilService.makeId(),
                        point: 2,
                        gem: 'emerald',
                        cost: { sapphire: 2, diamond: 4, onyx: 1 }
                    },
                    {
                        id: utilService.makeId(),
                        point: 3,
                        gem: 'diamond',
                        cost: { diamond: 6, }
                    },
                    {
                        id: utilService.makeId(),
                        point: 2,
                        gem: 'emerald',
                        cost: { sapphire: 5, diamond: 3 }
                    },
                    {
                        id: utilService.makeId(),
                        point: 2,
                        gem: 'diamond',
                        cost: { emerald: 1, ruby: 4, onyx: 2 }
                    }
                ]
            },
            thirdLevel: {
                cardsStack: thirdLevelDevCards.slice(3),
                shownCards: [
                    {
                        id: utilService.makeId(),
                        point: 5,
                        gem: 'ruby',
                        cost: { emerald: 7, ruby: 3 }
                    },
                    {
                        id: utilService.makeId(),
                        point: 3,
                        gem: 'onyx',
                        cost: { emerald: 5, sapphire: 3, ruby: 3, diamond: 3 }
                    },
                    {
                        id: utilService.makeId(),
                        point: 4,
                        gem: 'ruby',
                        cost: { emerald: 7 }
                    },
                    {
                        id: utilService.makeId(),
                        point: 3,
                        gem: 'diamond',
                        cost: { emerald: 3, sapphire: 3, ruby: 5, onyx: 3 }
                    }
                ]
            }
        },


        players: [
            {
                miniUser: {
                    userId: 'userI0001',
                    displayName: 'Abra Kadabra',
                    avatarUrl: 'https://robohash.org/Abra Kadabra?set=set2'
                },

                isActive: true,

                coin: { gem: { emerald: 0, sapphire: 0, ruby: 0, diamond: 0, onyx: 0 }, gold: 0 }
            },

            {
                miniUser: {
                    userId: 'userI0002',
                    displayName: 'Hokus Pokus',
                    avatarUrl: 'https://robohash.org/Hokus Pokus?set=set2'
                },

                isActive: true,

                coin: { gem: { emerald: 0, sapphire: 0, ruby: 0, diamond: 0, onyx: 0 }, gold: 0 }
            },
        ]
    }
]