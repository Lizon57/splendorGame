import { useSelector } from 'react-redux'
import { CoinPreview } from './CoinPreview'

export const CoinLst = () => {
    // CMP data
    const sortedGems = ['emerald', 'sapphire', 'ruby', 'diamond', 'onyx']
    const { game: { players } } = useSelector(state => state.gameModule)
    const { user } = useSelector(state => state.userModule)


    // Conditional render - if player not logged in or not found on game data - return
    const playerData = players.filter(player => player.miniUser.userId === user._id)[0]
    if (!playerData) return <></>


    const { coin } = playerData


    // CMP render
    return (
        <>
            <div style={{ display: 'flex', gap: '1rem' }}>
                {sortedGems.map(gem => <CoinPreview key={gem} coin={gem} amount={coin.fluid.gem[gem]} />)}

                <CoinPreview coin={'gold'} amount={coin.fluid.gold} />

            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
                {sortedGems.map(gem => <CoinPreview key={gem} coin={gem} amount={coin.fixed[gem]} />)}
            </div>
        </>
    )
}