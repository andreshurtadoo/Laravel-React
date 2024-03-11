import axios from "axios";

const endpoint = 'http://localhost:8000/api';

// GET - Get all books
export const getBooksRequest = async () =>
    await axios.get(`${endpoint}/books`)

// POST - Create a book
export const createBookRequest = async (book) =>
    await axios.post(`${endpoint}/book`, book)


// DELETE - Delete a book
export const deleteBookRequest = async (id) =>
    await axios.delete(`${endpoint}/book/${id}`)


// GET - Get a book
export const getBookRequest = async (id) =>
    await axios.get(`${endpoint}/book/${id}`)


// PUT - Edit a book
export const editBookRequest = async (id, book) =>
    await axios.put(`${endpoint}/book/${id}`, book)
