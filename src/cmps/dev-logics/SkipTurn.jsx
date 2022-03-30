import { useDispatch, useSelector } from 'react-redux'
import { setTurnPlayerIdx } from '../../store/actions/game'


export const SkipTurn = () => {
    // CMP data
    const dispatch = useDispatch()
    const { game: { turn: { playerIdx }, players } } = useSelector(state => state.gameModule)


    // CMP function
    const onSkipTurn = () => dispatch(setTurnPlayerIdx(players, playerIdx))


    // CMP render
    return (
        <button onClick={onSkipTurn}>Skip turn</button>
    )
}