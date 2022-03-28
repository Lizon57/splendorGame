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


        players: [
            {
                miniUser: {
                    userId: 'userI0001',
                    displayName: 'Abra Kadabra',
                    avatarUrl: 'https://robohash.org/Abra Kadabra?set=set2'
                },

                isActive: true,
            },

            {
                miniUser: {
                    userId: 'userI0002',
                    displayName: 'Hokus Pokus',
                    avatarUrl: 'https://robohash.org/Hokus Pokus?set=set2'
                },

                isActive: true,
            },
        ]
    }
]