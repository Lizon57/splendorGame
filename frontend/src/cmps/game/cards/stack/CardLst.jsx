import { CardPackage } from './CardPackage'


export const CardLst = () => {
    // CMP data
    const cardLevels = ['firstLevel', 'secondLevel', 'thirdLevel']


    // CMP render
    return (
        <div style={{ display: 'flex', gap: '1rem' }}>
            {cardLevels.map(level => <CardPackage key={level} level={level} />)}
        </div>
    )
}