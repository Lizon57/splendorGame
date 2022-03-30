import { useDispatch } from 'react-redux'


export const SkipTrn = () => {
    const dispatch = useDispatch()


    const skipTrn = () => {
        dispatch({ type: 'SKIP_TURN' })
    }

    return (
        <button onClick={skipTrn}>Skip</button>
    )
}