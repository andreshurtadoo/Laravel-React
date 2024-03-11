// import { useBooks } from "../context/BookContext";

export default function BookCard({ id, titulo, genero }) {

    // const { deleteBook } = useBooks();

    return (
        <div className="border rounded-md p-4">
            <header className="flex justify-between">
                <h2 className="text-sm font-bold">{titulo}</h2>
            </header>
            <p className="text-xs">{genero}</p>
            {/* <div className="flex gap-x-2 py-2">
                <button className="bg-indigo-500 px-2 py-1 text-white rounded-md" onClick={() => deleteBook(id)}>Delete</button>
            </div> */}
        </div>
    )
}