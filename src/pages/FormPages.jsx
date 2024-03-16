import { useState, useEffect } from "react";
import { useBooks } from "../context/BookContext";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'sonner'
import * as Yup from 'yup';

function FormPages() {
    const params = useParams();
    const navigate = useNavigate();

    const { createBook, getBook, editBook } = useBooks();
    const [numAuthors, setNumAuthors] = useState(1);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null); // Nuevo estado para almacenar el archivo de imagen

    // Valores del formulario
    const initialValues = {
        titulo: '',
        genero: 'Ficcion',
        fecha_publicacion: '',
        editorial: '',
        imagen_portada: '',
        autores: []

    }

    const validationSchema = Yup.object().shape({
        titulo: Yup.string().required('El título es obligatorio'),
        genero: Yup.string().required('El género es obligatorio'),
        fecha_publicacion: Yup.date().required('La fecha de publicación es obligatoria'),
        editorial: Yup.string().required('La editorial es obligatoria'),
        imagen_portada: Yup.mixed().required('La imagen de portada es obligatoria'),
        autores: Yup.array().of(Yup.object().shape({
            NombreAutor: Yup.string().required('El nombre del autor es obligatorio'),
            ApellidoAutor: Yup.string().required('El apellido del autor es obligatorio'),
            FechaNacimientoAutor: Yup.date().required('La fecha de nacimiento del autor es obligatoria'),
            FechaFallecimientoAutor: Yup.date()
        }))
    });

    const [book, setBook] = useState(initialValues);

    // Controlador de autores ->  aumenta la cantidad de autores
    const handleAddAuthor = () => {
        setNumAuthors(prevNumAuthors => prevNumAuthors + 1);
    };

    // Controlador de imagen -> muestra la imagen en el formulario
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        const loadBooks = async () => {
            if (params.id) {
                const [bookData] = await getBook(params.id);
                setBook({
                    titulo: bookData.TituloLibro,
                    genero: bookData.Genero,
                    fecha_publicacion: bookData.FechaPublicacion,
                    editorial: bookData.Editorial,
                    imagen_portada: bookData.Imagen_portada,
                    autores: bookData.autores
                });
                setImagePreview(`http://localhost:8000/storage/${bookData.ImagenPortada}`);
                // Actualizamos numAuthors al número de autores recibidos
                setNumAuthors(bookData.autores.length || 1);
            }
        }
        loadBooks();
    }, [params.id, getBook]);

    return (
        <>
            <Formik
                initialValues={book}
                validationSchema={validationSchema}
                enableReinitialize={true}

                onSubmit={async (values, { resetForm }) => {
                    try {
                        const formData = new FormData();
                        formData.append('titulo', values.titulo);
                        formData.append('genero', values.genero);
                        formData.append('fecha_publicacion', values.fecha_publicacion);
                        formData.append('editorial', values.editorial);
                        formData.append('imagen_portada', imageFile); // Aquí agregamos el archivo de imagen al FormData
                        // Agregar información de los autores al FormData
                        values.autores.forEach((autor, index) => {
                            formData.append(`autores[${index}][nombre]`, autor.NombreAutor);
                            formData.append(`autores[${index}][apellido]`, autor.ApellidoAutor);
                            formData.append(`autores[${index}][fecha_nacimiento]`, autor.FechaNacimientoAutor);
                            if (autor.FechaFallecimientoAutor) {
                                formData.append(`autores[${index}][fecha_fallecimiento]`, autor.FechaFallecimientoAutor);
                            }
                        });

                        if (params.id) {
                            await editBook(params.id, formData)
                            toast.success('Libro editado exitosamente!')
                        } else {
                            await createBook(formData)
                            toast.success('Libro creado exitosamente!')
                        }
                        navigate('/')
                        setBook(initialValues)
                        resetForm()
                    } catch (error) {
                        toast.error('Error al enviar el formulario. Por favor, inténtalo de nuevo más tarde.');
                        console.error('Error al enviar el formulario:', error);
                    }
                }}
            >
                {({ handleChange, handleSubmit, isSubmitting, values }) => (
                    <Form onSubmit={handleSubmit} className='max-w-lg rounded-md mx-auto mt-5 mb-4'>
                        <h2 className="text-2xl font-bold text-center py-3">Formulario de Creación de Libros</h2>

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
                            <ErrorMessage name="titulo" component="div" className="text-red-500 text-sm" />
                        </div>

                        {/* Datos de los Autores */}
                        <div className="py-2">
                            <h2 className="text-lg font-bold text-center pb-2">Datos del Autor</h2>
                            {[...Array(numAuthors)].map((_, index) => (
                                <div key={index} className="flex flex-col sm:flex-row gap-2 py-1">
                                    {/* Inputs de los datos del autor */}
                                    <input
                                        type="text"
                                        name={`autores[${index}].NombreAutor`}
                                        placeholder="Nombre"
                                        onChange={handleChange}
                                        value={values.autores[index]?.NombreAutor || ''}
                                        className="px-2 py-1 rounded-md w-full border"
                                    />
                                    <ErrorMessage name={`autores[${index}].NombreAutor`} component="div" className="text-red-500 text-sm" />

                                    <input
                                        type="text"
                                        name={`autores[${index}].ApellidoAutor`}
                                        placeholder="Apellido"
                                        onChange={handleChange}
                                        value={values.autores[index]?.ApellidoAutor || ''}
                                        className="px-2 py-1 rounded-md w-full border"
                                    />
                                    <ErrorMessage name={`autores[${index}].ApellidoAutor`} component="div" className="text-red-500 text-sm" />

                                    <input
                                        type="date"
                                        name={`autores[${index}].FechaNacimientoAutor`}
                                        onChange={handleChange}
                                        value={values.autores[index]?.FechaNacimientoAutor || ''}
                                        className="px-2 py-1 rounded-md w-full border"
                                    />
                                    <ErrorMessage name={`autores[${index}].FechaNacimientoAutor`} component="div" className="text-red-500 text-sm" />

                                    <input
                                        type="date"
                                        name={`autores[${index}].FechaFallecimientoAutor`}
                                        placeholder="Fecha de fallecimiento (Opcional)"
                                        onChange={handleChange}
                                        value={values.autores[index]?.FechaFallecimientoAutor || ''}
                                        className="px-2 py-1 rounded-md w-full border"
                                    />

                                    {/* Botón para agregar otro autor */}
                                    {index === numAuthors - 1 && (
                                        <button
                                            type="button"
                                            onClick={handleAddAuthor}
                                            className="px-2 rounded-md bg-indigo-500 text-white hover:bg-indigo-600"
                                        >
                                            <FontAwesomeIcon icon={faPlus} />
                                        </button>
                                    )}
                                </div>
                            ))}
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
                            <ErrorMessage name="genero" component="div" className="text-red-500 text-sm" />
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
                            <ErrorMessage name="fecha_publicacion" component="div" className="text-red-500 text-sm" />
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
                            <ErrorMessage name="editorial" component="div" className="text-red-500 text-sm" />
                        </div>

                        {/* Preview Img */}
                        <div className="py-3">
                            {imagePreview && (
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="rounded-lg border border-gray-400 max-w-md mx-auto"
                                />
                            )}
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
                                                name="imagen_portada"
                                                type="file"
                                                className="sr-only"
                                                onChange={(e) => {
                                                    handleImageChange(e);
                                                    handleChange(e);
                                                }}
                                            />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </div>
                        </div>


                        <button type="submit" disabled={isSubmitting} className='block bg-indigo-500 px-2 py-1 text-white w-full rounded-md hover:bg-indigo-600'>
                            {isSubmitting ? 'Saving...' : 'Save'}
                        </button>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default FormPages;