export const CardPreview = ({ card }) => {
    console.log(card)

    return (
        <div>
            <div>Point: {card.point}</div>
            <div>Gem: {card.gem}</div>
            <div>Cost: {JSON.stringify(card.cost, null, 2)}</div>
        </div>
    )
}