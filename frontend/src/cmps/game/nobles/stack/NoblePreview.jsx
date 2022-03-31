export const NoblePreview = ({ noble }) => {
    return (
        <div>
            {noble.id} <br />
            cost: {JSON.stringify(noble.cost)}
        </div>
    )
}