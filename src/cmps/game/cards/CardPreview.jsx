export const CardPreview = ({ card, isAbleBuy, level, onBuyingCard }) => {
    return (
        <div>
            <hr />
            <div>Point: {card.point}</div>
            <div>Gem: {card.gem}</div>
            <div>Cost: {JSON.stringify(card.cost, null, 2)}</div>
            {isAbleBuy && <button onClick={() => onBuyingCard(card, level)}>Buy</button>}
        </div>
    )
}