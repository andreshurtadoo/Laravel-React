import DataTable from 'react-data-table-component';
import { useState, useEffect } from 'react';
import { useBooks } from '../context/BookContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'sonner'

function DatatablePage() {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState('');
    const { books, loadBooks, deleteBook } = useBooks();

    useEffect(() => {
        loadBooks();
    }, [])


    const handleSearch = (e) => {
        const value = e.target.value || '';
        setSearchText(value);
    };

    const filteredData = books.filter(item =>
        Object.keys(item).some(key =>
            String(item[key]).toLowerCase().includes(searchText.toLowerCase())
        )
    );

    const handleDelete = async (row) => {
        if (confirm(`Esta seguro que quieres eliminar el libro ${row.Titulo}`)) {
            await deleteBook(row.LibroID)
            toast.success('Libro eliminado exitosamente!')
        }
    }

    const columns = [
        {
            name: 'Titulo',
            selector: row => row.Titulo,
        },
        {
            name: 'Genero',
            selector: row => row.Genero
        },
        {
            name: 'Editorial',
            selector: row => row.Editorial,
        },
        {
            name: 'Fecha Publicacion',
            selector: row => row.FechaPublicacion,
            sortable: true
        },
        {
            name: 'Autores',
            selector: row => row.Autores,
        },
        {
            name: 'Acciones',
            cell: row => (
                <div>
                    <button className='px-1 ' onClick={() => navigate(`/new/${row.LibroID}`)}>
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    <button className='px-1' onClick={() => handleDelete(row)}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }
    ];

    return (
        <div className='p-4'>
            <h2 className="text-2xl font-bold text-center py-3">
                Lista de libros
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <input
                    type="text"
                    value={searchText}
                    onChange={handleSearch}
                    placeholder="Buscar..."
                    className="border border-gray-300 rounded-md py-1 px-4 mb-4"
                    style={{ width: '100%', maxWidth: '200px' }}
                />
            </div>
            <DataTable
                columns={columns}
                data={filteredData}
                pagination
            />
        </div>
    )
}

export default DatatablePage;