import { useEffect } from "react";
import BookCard from "../components/BookCard";
import { useBooks } from "../context/BookContext";

function HomePage() {
    const { books, loadBooks } = useBooks();

    useEffect(() => {
        loadBooks();
    }, [])

    function renderMain() {
        if (books.length === 0) return <h2>Not books Yet</h2>
        return books.map((book) => (
            <BookCard
                key={book.LibroID}
                titulo={book.Titulo}
                genero={book.Genero}
                imagenPortada={book.ImagenPortada}
            />
        ));
    }

    return (
        <div>
            <h2 className="text-4xl font-bold text-center py-6">Books</h2>
            <div className="books-container">
                {renderMain()}
            </div>
        </div>
    )
}

export default HomePage;