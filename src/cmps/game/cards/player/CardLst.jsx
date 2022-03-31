import { useSelector } from 'react-redux'

import { gameService } from '../../../../services/gameService'

import { CardPreview } from './CardPreview'


export const CardLst = () => {
    // CMP data
    const { game, game: { players } } = useSelector(state => state.gameModule)
    const { user } = useSelector(state => state.userModule)


    // Conditional render - if player not logged in or not found on game data - return
    const currPlayerIdx = players.findIndex(player => player.miniUser.userId === user._id)
    if (currPlayerIdx === -1) return <></>


    // CMP functions
    const isAbleBuy = cost => {
        // Prevent showing buy card button if:
        // - It's not player turn (For secure)
        // - It's not buying card phase on turn
        // - Player don't have enough coin to buy it
        const { coin } = game.players[game.turn.playerIdx]

        if ((game.players[game.turn.playerIdx].miniUser.userId !== user._id) ||
            (game.turn.phase === 1) ||
            !gameService.isPlayerAbleBuyCard(cost, coin.total)
        ) return false

        return true
    }


    const onBuyingCard = card => {
        console.log(card)
    }


    // CMP render
    return (
        <div style={{ display: 'flex', gap: '1rem' }}>
            {players[game.turn.playerIdx].savedCards.map(card => <CardPreview
                key={card.id}
                card={card}
                isAbleBuy={isAbleBuy(card.cost)}
                onBuyingCard={onBuyingCard}
            />)}
        </div>
    )
}