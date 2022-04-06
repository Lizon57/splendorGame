import { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { gemPick } from '../../../../store/actions/game.action'

import { CoinPreview } from './CoinPreview'


export const CoinLst = () => {
    // CMP data
    const sortedGems = ['emerald', 'sapphire', 'ruby', 'diamond', 'onyx']
    const { game, game: { players, process: { currTurnPlayerIdx } } } = useSelector(state => state.gameModule)
    const { user } = useSelector(state => state.userModule)
    const dispatch = useDispatch()
    const [stack, setStack] = useState(game.coinStack)
    const [pickedGem, setPickedGem] = useState({ emerald: 0, sapphire: 0, ruby: 0, diamond: 0, onyx: 0 })

    const totalPickedGemAmount = Object.values(pickedGem).reduce((acc, curr) => acc + curr)
    const totalStackGemAmount = Object.values(stack.gem).reduce((acc, curr) => acc + curr)


    // CMP functions
    // Update stack and pick state
    const onPickGem = (gem, isPicking) => {
        const gemOnStack = stack.gem[gem]
        const gemPickedAmount = pickedGem[gem]
        setStack({ ...stack, gem: { ...stack.gem, [gem]: isPicking ? gemOnStack - 1 : gemOnStack + 1 } })
        setPickedGem({ ...pickedGem, [gem]: isPicking ? gemPickedAmount + 1 : gemPickedAmount - 1 })
    }

    // Check if player can pick or return coin
    const isAblePicking = gem => {
        // Prevent picking gem if:
        // - Not player turn
        // - Gem is out of stack
        // - Player picked already two gem of wanted gem
        // - Player pick two different gems and try picking second of one of them
        // - Player pick second same gem when there are less then 3 available
        // - Player already pick 3 gem
        // - Player already picked 2 gems of same type
        if ((players[currTurnPlayerIdx].miniUser.userId !== user._id) ||
            (!stack.gem[gem]) ||
            (pickedGem[gem] >= 2) ||
            (totalPickedGemAmount >= 2 && pickedGem[gem]) ||
            (pickedGem[gem] && stack.gem[gem] < 3) ||
            (totalPickedGemAmount >= 3) ||
            (Object.values(pickedGem).some(value => value === 2)))
            return false

        return true
    }

    const isAbleReturn = gem => (pickedGem[gem]) ? true : false


    // Check if player can invoke his pick
    const isAbleInvokePick = () => {
        // Allow player invoke pick coin if:
        // - No gem on stack
        // - Player pick 3 different gems
        // - Player pick twice same gem

        if ((!totalStackGemAmount) ||
            (totalPickedGemAmount === 3) ||
            Object.values(pickedGem).some(value => value === 2))
            return true

        // Also allow player invoke pick if:
        // - Player can take only 2 different gems (and took them)
        // - Player can only take 1 gem (and took it)
        // - Player have no coin to take
        const unPickAbleGemAmount = Object.keys(stack.gem).reduce((acc, gem) => {
            if (!stack.gem[gem] || ((stack.gem[gem] < 3) && pickedGem[gem])) acc++
            return acc
        }, 0)
        if (unPickAbleGemAmount === 5) return true

        return false
    }

    // On invoke pick
    const onInvokePick = () => {
        dispatch(gemPick(players, currTurnPlayerIdx, pickedGem, stack))
        setPickedGem({ emerald: 0, sapphire: 0, ruby: 0, diamond: 0, onyx: 0 })
    }



    // CMP render
    return (
        <div style={{ display: 'flex', gap: '1rem' }}>
            {sortedGems.map(gem => <CoinPreview
                key={gem}
                coin={gem}
                onStack={stack.gem[gem]}
                pickedAmount={pickedGem[gem]}
                isAblePicking={isAblePicking(gem)}
                isAbleReturn={isAbleReturn(gem)}
                onPickCoin={onPickGem}
            />)}

            <CoinPreview
                coin={'gold'}
                onStack={stack.gold}
            />

            {isAbleInvokePick() && <button onClick={onInvokePick}>Pick gems</button>}
        </div>
    )
}