export const CardPreview = ({ card, isAbleBuy, onBuyingCard }) => {
    return (
        <div>
            <div>Point: {card.point}</div>
            <div>Gem: {card.gem}</div>
            <div>Cost: {JSON.stringify(card.cost, null, 2)}</div>
            {isAbleBuy && <button onClick={() => onBuyingCard(card)}>Buy</button>}
        </div>
    )
}