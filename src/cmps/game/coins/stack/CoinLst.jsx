import { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { coinPick } from '../../../../store/actions/game'

import { CoinPreview } from './CoinPreview'


export const CoinLst = () => {
    // CMP data
    const sortedGems = ['emerald', 'sapphire', 'ruby', 'diamond', 'onyx']
    const { game } = useSelector(state => state.gameModule)
    const { user } = useSelector(state => state.userModule)
    const dispatch = useDispatch()
    const [stack, setStack] = useState(game.coinStack)
    const [pickedCoin, setPickedCoin] = useState({ gem: { emerald: 0, sapphire: 0, ruby: 0, diamond: 0, onyx: 0 }, gold: 0 })

    const totalPickedGemAmount = Object.values(pickedCoin.gem).reduce((acc, curr) => acc + curr)
    const totalStackGemAmount = Object.values(stack.gem).reduce((acc, curr) => acc + curr)


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

    // Check if player can pick or return coin
    const isAblePicking = coin => {
        if (coin === 'gold') {
            // Prevent picking gold if:
            // - Not player turn
            // - There is no gold on stack
            // - Player finished his coin pick for this turn
            // - Player already picked a coin
            // - Player already picked a gem
            if ((game.players[game.turn.playerIdx].miniUser.userId !== user._id) ||
                (game.turn.phase !== 0) ||
                (!stack.gold) ||
                (pickedCoin.gold) ||
                (totalPickedGemAmount > 0))
                return false
        } else {
            // Prevent picking gem if:
            // - Not player turn
            // - Player finished his coin pick for this turn
            // - Player already picked gold
            // - Gem is out of stack
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
        // Allow player invoke pick coin if:
        // - Player pick gold
        // - No coin on stack
        // - Player pick 3 different gems
        // - Player pick twice same gem

        if ((pickedCoin.gold) ||
            (!totalStackGemAmount && !stack.gold) ||
            (totalPickedGemAmount === 3) ||
            Object.values(pickedCoin.gem).some(value => value === 2))
            return true

        // Also allow player invoke pick if:
        // - Player can take only 2 different gems (and took them)
        // - Player can only take 1 gem (and took it)
        // - Player have no coin to take
        const unPickAbleGemAmount = Object.values(stack.gem).reduce((acc, curr) => {
            if (!curr) acc++
            return acc
        }, 0)
        if ((unPickAbleGemAmount === 3 && totalPickedGemAmount === 2) ||
            (unPickAbleGemAmount === 4 && totalPickedGemAmount === 1))
            return true

        return false
    }

    // On invoke pick
    const onInvokePick = () => {
        dispatch(coinPick(game.players[game.turn.playerIdx], game.turn.playerIdx, pickedCoin))
        setPickedCoin({ gem: { emerald: 0, sapphire: 0, ruby: 0, diamond: 0, onyx: 0 }, gold: 0 })
    }


    const onSkipPickCoin = () => dispatch({ type: 'SET_TURN_PHASE', phase: 2 })



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

            {(game.turn.phase === 0) && <button onClick={onSkipPickCoin}>Skip pick coin</button>}
        </div>
    )
}