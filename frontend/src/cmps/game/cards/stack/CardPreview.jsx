export const CardPreview = ({ card, isAbleBuy, isAbleSaveCard, level, onBuyingCard, onSavingCard }) => {
    return (
        <div>
            <hr />
            <div>Point: {card.point}</div>
            <div>Gem: {card.gem}</div>
            <div>Cost: {JSON.stringify(card.cost, null, 2)}</div>
            {isAbleBuy && <button onClick={() => onBuyingCard(card, level)}>Buy</button>}
            {isAbleSaveCard && <button onClick={() => onSavingCard(card, level)}>Save</button>}
        </div>
    )
}