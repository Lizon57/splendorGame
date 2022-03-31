import { utilService } from '../../services/utilService'


export const nobleCards = [
    {
        id: utilService.makeId(),
        imgUrl: 'https://robohash.org/noble?set=set4',
        cost: { emerald: 3, ruby: 3, onyx: 3 }
    },
    {
        id: utilService.makeId(),
        imgUrl: 'https://robohash.org/noble?set=set4',
        cost: { emerald: 4, ruby: 4 }
    },
    {
        id: utilService.makeId(),
        imgUrl: 'https://robohash.org/noble?set=set4',
        cost: { sapphire: 3, diamond: 3, onyx: 3 }
    },
    {
        id: utilService.makeId(),
        imgUrl: 'https://robohash.org/noble?set=set4',
        cost: { sapphire: 4, diamond: 4 }
    },
    {
        id: utilService.makeId(),
        imgUrl: 'https://robohash.org/noble?set=set4',
        cost: { sapphiemerald: 4, sapphire: 4 }
    },
    {
        id: utilService.makeId(),
        imgUrl: 'https://robohash.org/noble?set=set4',
        cost: { ruby: 4, nyx: 4 }
    },
    {
        id: utilService.makeId(),
        imgUrl: 'https://robohash.org/noble?set=set4',
        cost: { emerald: 3, sapphire: 3, diamond: 3 }
    },
    {
        id: utilService.makeId(),
        imgUrl: 'https://robohash.org/noble?set=set4',
        cost: { emerald: 3, sapphire: 3, ruby: 3 }
    },
    {
        id: utilService.makeId(),
        imgUrl: 'https://robohash.org/noble?set=set4',
        cost: { ruby: 3, diamond: 3, onyx: 3 }
    },

    // For easy adding:
    //     {
    //     id: utilService.makeId(),
    //     imgUrl: 'https://robohash.org/noble?set=set4',
    //     cost: { emerald: 0, sapphire: 0, ruby: 0, diamond: 0, onyx: 0 }
    //     },
]