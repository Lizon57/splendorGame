export const NoblePreview = ({ noble }) => {
    return (
        <div>
            {noble.id} <br />
            {JSON.stringify(noble.cost)}
        </div>
    )
}