export const CoinPreview = ({ coin, onStack, pickedAmount, isAblePicking, isAbleReturn, onPickCoin }) => {
    return (
        <div>
            <div>{coin}</div>

            <div>
                {onStack}<br />
                {isAblePicking && <button onClick={() => onPickCoin(coin, true)}>+</button>}
                {pickedAmount}
                {isAbleReturn && <button onClick={() => onPickCoin(coin, false)}>-</button>}
            </div>
        </div>
    )
}