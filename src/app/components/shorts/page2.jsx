export default function Page2({ onChangePage }) {
    const nextPage = () => {
        onChangePage(3, {});
    }
    return (
        <div>page 2
            <button onClick={nextPage}>Go to page 3</button>
        </div>
    )
}