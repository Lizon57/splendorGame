import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { CoinPreview } from './CoinPreview'


export const CoinLst = () => {
    // CMP data
    const sortedGems = ['emerald', 'sapphire', 'ruby', 'diamond', 'onyx']
    const { game } = useSelector(state => state.gameModule)
    const { user } = useSelector(state => state.userModule)
    const dispatch = useDispatch()
    const [stack, setStack] = useState(game.coinStack)
    const [pickedCoin, setPickedCoin] = useState({ gem: { emerald: 0, sapphire: 0, ruby: 0, diamond: 0, onyx: 0 }, gold: 0 })


    // CMP functions
    // Update stack and pick state
    const onPickCoin = (coin, isPicking) => {
        if (coin === 'gold') {
            const goldOnStack = stack.gold
            const pickedGold = pickedCoin.gold
            setStack({ ...stack, gold: isPicking ? goldOnStack - 1 : goldOnStack + 1 })
            setPickedCoin({ ...pickedCoin, gold: isPicking ? pickedGold + 1 : pickedGold - 1 })
        } else {
            const gemOnStack = stack.gem[coin]
            const pickedGem = pickedCoin.gem[coin]
            setStack({ ...stack, gem: { ...stack.gem, [coin]: isPicking ? gemOnStack - 1 : gemOnStack + 1 } })
            setPickedCoin({ ...pickedCoin, gem: { ...pickedCoin.gem, [coin]: isPicking ? pickedGem + 1 : pickedGem - 1 } })
        }
    }


    const totalPickedGemAmount = Object.values(pickedCoin.gem).reduce((acc, curr) => acc + curr)
    // Check if player can pick or return coin
    const isAblePicking = coin => {
        if (coin === 'gold') {
            // Avoid picking gold if:
            // - Not player turn
            // - Player finished his coin pick for this turn
            // - There is no gold on stack
            // - Player already picked a gem
            if ((game.players[game.turn.playerIdx].miniUser.userId !== user._id) ||
                (game.turn.phase !== 0) ||
                (pickedCoin.gold) ||
                (totalPickedGemAmount > 0))
                return false
        } else {
            // Avoid picking gem if:
            // - Not player turn
            // - Player finished his coin pick for this turn
            // - Player already picked gold
            // - Player pick out of stack gem
            // - Player picked already two gem of wanted gem
            // - Player pick two different gems and try picking second of one of them
            // - Player pick second same gem when there are less then 3 available
            // - Player already pick 3 gem
            // - Player already picked 2 gems of same type
            if ((game.players[game.turn.playerIdx].miniUser.userId !== user._id) ||
                (game.turn.phase !== 0) ||
                (pickedCoin.gold) ||
                (!stack.gem[coin]) ||
                (pickedCoin.gem[coin] >= 2) ||
                (totalPickedGemAmount >= 2 && pickedCoin.gem[coin]) ||
                (pickedCoin.gem[coin] && stack.gem[coin] < 3) ||
                (totalPickedGemAmount >= 3) ||
                (Object.values(pickedCoin.gem).some(value => value === 2)))
                return false
        }

        return true
    }

    const isAbleReturn = coin => {
        if (coin === 'gold' && pickedCoin.gold) return true
        else if (pickedCoin.gem[coin]) return true
        return false
    }


    // Check if player can invoke his pick
    const isAbleInvokePick = () => {
        if ((pickedCoin.gold) ||
            (totalPickedGemAmount === 3) ||
            Object.values(pickedCoin.gem).some(value => value === 2))
            return true
        return false
    }

    // On invoke pick
    const onInvokePick = () => {
        dispatch({ type: 'SET_COIN_PICK', payload: { stack, pickedCoin } })
        setPickedCoin({ gem: { emerald: 0, sapphire: 0, ruby: 0, diamond: 0, onyx: 0 }, gold: 0 })
    }



    // CMP render
    return (
        <div style={{ display: 'flex', gap: '1rem' }}>
            {sortedGems.map(gem => <CoinPreview
                key={gem}
                coin={gem}
                onStack={stack.gem[gem]}
                pickedAmount={pickedCoin.gem[gem]}
                isAblePicking={isAblePicking(gem)}
                isAbleReturn={isAbleReturn(gem)}
                onPickCoin={onPickCoin}
            />)}

            <CoinPreview
                coin={'gold'}
                onStack={stack.gold}
                pickedAmount={pickedCoin.gold}
                isAblePicking={isAblePicking('gold')}
                isAbleReturn={isAbleReturn('gold')}
                onPickCoin={onPickCoin}
            />

            {isAbleInvokePick() && <button onClick={onInvokePick}>Pick coins</button>}
        </div>
    )
}