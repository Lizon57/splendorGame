import { useSelector } from 'react-redux'
import { NoblePreview } from './NoblePreview'


export const NobleLst = () => {
    const { game: { players } } = useSelector(state => state.gameModule)
    const { user } = useSelector(state => state.userModule)


    // Conditional render - if player not logged in or not found on game data - return
    const currTurnPlayerIdx = players.findIndex(player => player.miniUser.userId === user._id)
    if (currTurnPlayerIdx === -1) return <></>


    const { ownNobles } = players[currTurnPlayerIdx]

    return (
        <div style={{ display: 'flex', gap: '1rem' }}>
            {ownNobles.map(noble => <NoblePreview key={noble.id} noble={noble} />)}
        </div>
    )
}