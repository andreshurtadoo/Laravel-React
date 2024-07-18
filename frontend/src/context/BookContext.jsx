import { createContext, useContext, useState } from "react";
import { getBooksRequest, deleteBookRequest, createBookRequest, getBookRequest, editBookRequest } from "../api/laravel.api";

export const BookContext = createContext();

export const useBooks = () => {
    const context = useContext(BookContext);
    if (!context) {
        throw new Error("useBooks must be used within a TaskContextProvider")
    } else {
        return context
    }
}

export const BookContextProvider = ({ children }) => {
    const [books, setBooks] = useState([])

    const loadBooks = async () => {
        try {
            const response = await getBooksRequest()
            setBooks(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    const deleteBook = async (id) => {
        try {
            const response = await deleteBookRequest(id);
            setBooks(books.filter(book => book.LibroID !== id));
            console.log(response);
        } catch (error) {
            console.error(error)
        }
    }

    const createBook = async (book) => {
        try {
            const response = await createBookRequest(book);
            console.log(response);
            // setBooks([...books, response.data])
        } catch (error) {
            console.error(error)
        }
    }

    const getBook = async (id) => {
        try {
            const response = await getBookRequest(id);
            return response.data
        } catch (error) {
            console.error(error);
        }
    }

    const editBook = async (id, book) => {
        try {
            const response = await editBookRequest(id, book)
            return response
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <BookContext.Provider value={{ books, loadBooks, deleteBook, createBook, getBook, editBook }}>
            {children}
        </BookContext.Provider>
    )
}