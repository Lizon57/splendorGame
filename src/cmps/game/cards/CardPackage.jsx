import { useDispatch, useSelector } from 'react-redux'

import { gameService } from '../../../services/gameService'
import { buyingCard } from '../../../store/actions/game'

import { CardPreview } from './CardPreview'


export const CardPackage = ({ level }) => {
    // CMP data
    const { game } = useSelector(state => state.gameModule)
    const { user } = useSelector(state => state.userModule)
    const dispatch = useDispatch()


    // CMP functions
    const isAbleBuy = cost => {
        // Prevent showing buy card button if:
        // - It's not player turn (For secure)
        // - It's not buying card phase on turn
        // - Player don't have enough coin to buy it
        const { coin } = game.players[game.turn.playerIdx]

        if ((game.players[game.turn.playerIdx].miniUser.userId !== user._id) ||
            (game.turn.phase !== 1) ||
            !gameService.isPlayerAbleBuyCard(cost, coin.total)
        ) return false

        return true
    }


    const onBuyingCard = (card, level) => {
        card.level = level
        dispatch(buyingCard(game.players, game.turn.playerIdx, card, game.card[level]))
    }



    // CMP render
    return (
        <div>
            {level} onStack: {game.card[level].cardsStack.length}<br />

            Shown: {game.card[level].shownCards.map(card => <CardPreview
                key={card.id}
                card={card}
                level={level}
                isAbleBuy={isAbleBuy(card.cost)}
                onBuyingCard={onBuyingCard}
            />)}
        </div>
    )
}