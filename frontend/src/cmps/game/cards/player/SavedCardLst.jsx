import { useDispatch, useSelector } from 'react-redux'
import { buyingCard } from '../../../../store/actions/game.action'

import { gameService } from '../../../../services/gameService'

import { CardPreview } from './CardPreview'


export const SavedCardLst = () => {
    // CMP data
    const { game, game: { players, process: { currTurnPlayerIdx } } } = useSelector(state => state.gameModule)
    const { user } = useSelector(state => state.userModule)
    const dispatch = useDispatch()


    // CMP functions
    const isAbleBuy = cost => {
        // Prevent showing buy card button if:
        // - It's not player turn (For secure)
        // - Player don't have enough coin to buy it
        const { coin } = game.players[currTurnPlayerIdx]

        if ((game.players[currTurnPlayerIdx].miniUser.userId !== user._id) ||
            !gameService.isPlayerAbleBuyCard(cost, coin.total)
        ) return false

        return true
    }


    const onBuyingCard = card => dispatch(buyingCard(players, currTurnPlayerIdx, card))


    // CMP render
    return (
        <div style={{ display: 'flex', gap: '1rem' }}>
            {players[currTurnPlayerIdx].savedCards.map(card => <CardPreview
                key={card.id}
                card={card}
                isAbleBuy={isAbleBuy(card.cost)}
                onBuyingCard={onBuyingCard}
            />)}
        </div>
    )
}