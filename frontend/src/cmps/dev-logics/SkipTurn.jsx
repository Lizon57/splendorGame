import { useDispatch, useSelector } from 'react-redux'
import { setNextPlayerTurn } from '../../store/actions/game.action'


export const SkipTurn = () => {
    // CMP data
    const dispatch = useDispatch()
    const { game: { process: { currTurnPlayerIdx }, players } } = useSelector(state => state.gameModule)


    // CMP function
    const onSkipTurn = () => dispatch(setNextPlayerTurn(players, currTurnPlayerIdx))


    // CMP render
    return (
        <button onClick={onSkipTurn}>Skip turn</button>
    )
}