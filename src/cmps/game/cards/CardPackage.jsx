import { useSelector } from 'react-redux'

import { CardPreview } from './CardPreview'


export const CardPackage = ({ level }) => {
    const { game } = useSelector(state => state.gameModule)

    return (
        <div>
            {level} onStack: {game.card[level].cardsStack.length}<br />

            Shown: {game.card[level].shownCards.map(card => <CardPreview key={card.id} card={card} />)}
        </div>
    )
}