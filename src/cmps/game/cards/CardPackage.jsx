import { useDispatch, useSelector } from 'react-redux'

import { gameService } from '../../../services/gameService'

import { CardPreview } from './CardPreview'


export const CardPackage = ({ level }) => {
    const { game } = useSelector(state => state.gameModule)
    const { user } = useSelector(state => state.userModule)
    const dispatch = useDispatch()


    const isAbleBuy = cost => {
        const { coin } = game.players[game.turn.playerIdx]
        if ((game.players[game.turn.playerIdx].miniUser.userId !== user._id) ||
            (game.turn.phase !== 1) ||
            !gameService.isPlayerAbleBuyCard(cost, coin)
        ) return false

        return true
    }


    const onPickCard = (card, level) => {
        card.level = level
        dispatch({ type: 'BUY_CARD', payload: card })
    }


    return (
        <div>
            {level} onStack: {game.card[level].cardsStack.length}<br />

            Shown: {game.card[level].shownCards.map(card => <CardPreview
                key={card.id}
                card={card}
                level={level}
                isAbleBuy={isAbleBuy(card.cost)}
                onPickCard={onPickCard}
            />)}
        </div>
    )
}