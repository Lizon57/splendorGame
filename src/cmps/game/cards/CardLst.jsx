import { CardPackage } from './CardPackage'

export const CardLst = () => {
    const cardLevels = ['firstLevel', 'secondLevel', 'thirdLevel']


    return (
        <div style={{ display: 'flex', gap: '1rem' }}>
            {cardLevels.map(level => <CardPackage key={level} level={level} />)}
        </div>
    )
}