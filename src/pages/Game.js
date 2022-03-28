import { useState, useEffect } from 'react'
import { useParams } from 'react-router'

import { gameService } from '../services/gameService'


export const Game = () => {
    // CMP data
    const [loadingState, setLoadingState] = useState({ isLoading: true, err: '' })

    const { id } = useParams()


    // CMP functions
    // Load game by id (from query params) 
    const getGame = async () => {
        if (!loadingState.isLoading) return

        try {
            await gameService.getById(id)
            setLoadingState({ isLoading: false, err: '' })
        } catch (err) {
            setLoadingState({ isLoading: false, err })
        }
    }
    useEffect(getGame, [])



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