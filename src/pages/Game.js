import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'

import { gameService } from '../services/gameService'

import { UserLog } from '../cmps/dev-logics/user/UserLog'
import { CoinLst as StackCoinLst } from '../cmps/game/coins/stack/CoinLst'
import { NobleLst as StackNobleLst } from '../cmps/game/nobles/stack/NobleLst'
import { CardLst } from '../cmps/game/cards/CardLst'
import { CoinLst as PlayerCoinLst } from '../cmps/game/coins/player/CoinLst'
import { NobleLst as PlayerNobleLst } from '../cmps/game/nobles/player/NobleLst'
import { SkipTurn } from '../cmps/dev-logics/SkipTurn'


export const Game = () => {
    // CMP data
    const [loadingState, setLoadingState] = useState({ isLoading: true, err: '' })
    const { id } = useParams()
    const dispatch = useDispatch()


    // CMP functions
    // Load game by id and set to store (from query params)
    // Clear game from store when cmp unmount
    const getGame = async () => {
        if (!loadingState.isLoading) return

        try {
            const game = await gameService.getById(id)
            dispatch({ type: 'SET_GAME', payload: game })
            setLoadingState({ isLoading: false, err: '' })
        } catch (err) {
            setLoadingState({ isLoading: false, err })
        }
    }
    useEffect(() => getGame(), [])
    useEffect(() => () => dispatch({ type: 'SET_GAME', payload: {} }), [])


    // CMP loading / error render
    if (loadingState.isLoading) return <>Loading</>
    if (loadingState.err) return <>{loadingState.err}</>


    // CMP render
    return (
        <>
            <b>User</b>:
            <UserLog />

            <b>Coin stack</b>:
            <StackCoinLst />

            <b>Noble stack</b>:
            <StackNobleLst />

            <b>Card stack</b>:
            <CardLst />

            <b>Player coins</b>:
            <PlayerCoinLst />

            <b>Player nobles</b>:
            <PlayerNobleLst />

            <b>Skip trn</b>:
            <SkipTurn />
        </>
    )
}