import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'

import { gameService } from '../services/gameService'


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
    useEffect(getGame, [])
    useEffect(() => () => dispatch({ type: 'SET_GAME', payload: {} }), [])


    // CMP loading / error render
    if (loadingState.isLoading) return <>Loading</>
    if (loadingState.err) return <>{loadingState.err}</>


    // CMP render
    return (
        <div>
            Hello world!
        </div>
    )
}