import { useSelector } from 'react-redux'
import { NoblePreview } from './NoblePreview'

export const NobleLst = () => {
    // CMP data
    const { game } = useSelector(state => state.gameModule)


    // CMP render
    return (
        <div style={{ display: 'flex', gap: '1rem' }}>
            {game.nobles.map(noble => <NoblePreview key={noble.id} noble={noble} />)}
        </div>
    )
}