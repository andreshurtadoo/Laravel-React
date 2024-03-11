import { useState, useEffect } from "react";
import { useBooks } from "../context/BookContext";
import { Form, Formik } from "formik"
import { useParams, useNavigate } from 'react-router-dom';

function FormPages() {
    const params = useParams();
    const navigate = useNavigate();
    const { createBook, getBook, editBook } = useBooks();

    const initialValues = {
        titulo: '',
        genero: 'Ficcion',
        fecha_publicacion: '',
        editorial: '',
        imagen_portada: '',
        autores: [{
            nombre: '',
            apellido: '',
            fecha_nacimiento: '',
            fecha_fallecimiento: ''
        }]
    }

    const [book, setBook] = useState(initialValues)

    useEffect(() => {
        const loadBooks = async () => {
            if (params.id) {
                const [bookData] = await getBook(params.id);
                setBook({
                    titulo: bookData.TituloLibro,
                    genero: bookData.Genero,
                    fecha_publicacion: bookData.FechaPublicacion,
                    editorial: bookData.Editorial,
                    imagen_portada: '',
                    autores: [{
                        nombre: book.autores[0].NombreAutor,
                        apellido: book.autores[0].ApellidoAutor,
                        fecha_nacimiento: book.autores[0].FechaNacimientoAutor,
                        fecha_fallecimiento: ''
                    }]
                });
            }
        }
        loadBooks();
    }, [params.id, getBook]);

    return (
        <>
            <Formik
                initialValues={book}
                enableReinitialize={true}

                onSubmit={async (values, { resetForm }) => {
                    if (params.id) {
                        await editBook(params.id, values)
                    } else {
                        await createBook(values)
                    }
                    navigate('/')
                    setBook(initialValues)
                    resetForm()
                }}
            >
                {({ handleChange, handleSubmit, isSubmitting, values }) => (
                    <Form onSubmit={handleSubmit} className='max-w-lg rounded-md mx-auto mt-5 mb-4'>
                        <h2 className="text-2xl font-bold text-center py-3">
                            Formulario de Creación de Libros
                        </h2>

                        {/* Titulo */}
                        <div className="py-2">
                            <label htmlFor="titulo" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Título</label>
                            <input
                                type="text"
                                name='titulo'
                                id="titulo"
                                placeholder='Escriba el nombre del libro'
                                onChange={handleChange}
                                value={values.titulo}
                                className='px-2 py-1 rounded-md w-full border'
                            />
                        </div>

                        {/* Datos de los Autores */}
                        <div className="py-2">
                            <h2 className="text-lg font-bold text-center pb-2">Datos del Autor</h2>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <input
                                    type="text"
                                    name='autores[0].nombre'
                                    id="nombreAutor"
                                    placeholder='Nombre'
                                    onChange={handleChange}
                                    value={values.autores[0].nombre}
                                    className='px-2 py-1 rounded-md w-full border'
                                />
                                <input
                                    type="text"
                                    name='autores[0].apellido'
                                    id="apellidoAutor"
                                    placeholder='Apellido'
                                    onChange={handleChange}
                                    value={values.autores[0].apellido}
                                    className='px-2 py-1 rounded-md w-full border'
                                />
                                <input
                                    type="date"
                                    name="autores[0].fecha_nacimiento"
                                    id="fechaNacimientoAutor"
                                    onChange={handleChange}
                                    value={values.autores[0].fecha_nacimiento}
                                    className="px-2 py-1 rounded-md w-full border"
                                />
                                <input
                                    type="date"
                                    name="autores[0].fecha_fallecimiento"
                                    id="fechaFallecimientoAutor"
                                    placeholder="Fecha de fallecimiento (Opcional)"
                                    onChange={handleChange}
                                    value={values.autores[0].fecha_fallecimiento}
                                    className="px-2 py-1 rounded-md w-full border"
                                />
                            </div>
                        </div>

                        {/* Genero */}
                        <div className="py-3">
                            <label htmlFor="genero" className="block text-sm font-medium leading-6 text-gray-900 py-1">Género</label>
                            <select
                                name="genero"
                                id="genero"
                                className="px-2 py-1 rounded-md w-full border"
                                onChange={handleChange}
                                value={values.genero}
                            >
                                <option value="Ficcion">Ficcion</option>
                                <option value="Romance">Romance</option>
                                <option value="Fantasia">Fantasia</option>
                                <option value="Terror">Terror</option>
                                <option value="Autoayuda">Autoayuda</option>
                                <option value="Drama">Drama</option>
                                <option value="Humor">Humor</option>
                            </select>
                        </div>

                        {/* Fecha de publicacion */}
                        <div className="py-3">
                            <label htmlFor="fecha_publicacion" className="block text-sm font-medium leading-6 text-gray-900 py-1">Fecha de Publicación</label>
                            <input
                                type="date"
                                name="fecha_publicacion"
                                id="fecha_publicacion"
                                onChange={handleChange}
                                value={values.fecha_publicacion}
                                className="px-2 py-1 rounded-md w-full border"
                            />
                        </div>

                        {/* Editorial */}
                        <div className="py-3">
                            <label htmlFor="editorial" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Editorial</label>
                            <input
                                type="text"
                                name="editorial"
                                id="editorial"
                                placeholder="Escriba el nombre de la editorial"
                                onChange={handleChange}
                                value={values.editorial}
                                className="px-2 py-1 rounded-md w-full border"
                            />
                        </div>

                        {/* Cover */}
                        <div className="py-3">
                            <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                Cover photo
                            </label>
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                <div className="text-center">
                                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                        >
                                            <span>Upload a file</span>
                                            <input
                                                id="file-upload"
                                                name="cover"
                                                type="file"
                                                className="sr-only"
                                                onChange={handleChange}
                                                value={values.imagen_portada}
                                            />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </div>
                        </div>

                        <button type="submit" disabled={isSubmitting} className='block bg-indigo-500 px-2 py-1 text-white w-full rounded-md'>
                            {isSubmitting ? 'Saving...' : 'Save'}
                        </button>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default FormPages;