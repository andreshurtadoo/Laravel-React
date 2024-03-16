import axios from "axios";

const endpoint = 'http://localhost:8000/api';

// GET - Get all books
export const getBooksRequest = async () =>
    await axios.get(`${endpoint}/books`)

// POST - Create a book
export const createBookRequest = async (formData) => {
    try {
        const response = await axios.post(`${endpoint}/book`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data; // Devuelve los datos de la respuesta si es necesario
    } catch (error) {
        console.log(error)
        throw error; // Propaga el error para ser manejado por el llamador
    }
}

// DELETE - Delete a book
export const deleteBookRequest = async (id) =>
    await axios.delete(`${endpoint}/book/${id}`)


// GET - Get a book
export const getBookRequest = async (id) =>
    await axios.get(`${endpoint}/book/${id}`)


// PUT - Edit a book
export const editBookRequest = async (id, book) => {
    try {
        const response = await axios.put(`${endpoint}/book/${id}`, book)
        console.log(response);
        return response.data
    } catch (error) {
        console.log(error);
    }
}
