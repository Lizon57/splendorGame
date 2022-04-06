import { useDispatch, useSelector } from 'react-redux'
import { buyingCard, gainGold, gainNoble, savingCard, setNextPlayerTurn } from '../../../../store/actions/game.action'

import { gameService } from '../../../../services/gameService'

import { CardPreview } from './CardPreview'


export const CardPackage = ({ level }) => {
    // CMP data
    const { game, game: { coinStack, players, process: { currTurnPlayerIdx } } } = useSelector(state => state.gameModule)
    const { user } = useSelector(state => state.userModule)
    const dispatch = useDispatch()


    // CMP functions
    const isAbleBuy = cost => {
        // Prevent showing buy card button if:
        // - It's not player turn (For secure)
        // - Player don't have enough coin to buy it
        const { coin } = players[currTurnPlayerIdx]

        if ((players[currTurnPlayerIdx].miniUser.userId !== user._id) ||
            !gameService.isPlayerAbleBuyCard(cost, coin.total)
        ) return false

        return true
    }


    // Handle buying card - change data, check if player gain noble(s) and set next player turn
    const onBuyingCard = (card, level) => {
        card.level = level
        dispatch(buyingCard(players, currTurnPlayerIdx, card, game.card[level]))

        const player = players[currTurnPlayerIdx]
        if (player.ownCards > 7) {
            const gainNobles = gameService.checkPlayerGainNoble(player, game.nobles)
            gainNobles.forEach(noble => dispatch(gainNoble(noble, player, game.nobles)))
        }

        dispatch(setNextPlayerTurn(players, currTurnPlayerIdx))
    }


    const isAbleSaveCard = () => {
        // Prevent showing save card button if player has already 3 saved cards
        return (players[currTurnPlayerIdx].savedCards.length < 3) ? true : false
    }


    const onSavingCard = (card, level) => {
        card.level = level
        dispatch(savingCard(players, currTurnPlayerIdx, card, game.card[level]))
        dispatch(gainGold(players[currTurnPlayerIdx], currTurnPlayerIdx, coinStack))
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
                isAbleSaveCard={isAbleSaveCard()}
                onBuyingCard={onBuyingCard}
                onSavingCard={onSavingCard}
            />)}
        </div>
    )
}