export const CardPreview = ({ card, isAbleBuy }) => {
    return (
        <div>
            <hr />
            <div>Point: {card.point}</div>
            <div>Gem: {card.gem}</div>
            <div>Cost: {JSON.stringify(card.cost, null, 2)}</div>
            {isAbleBuy && <button>Buy</button>}
        </div>
    )
}