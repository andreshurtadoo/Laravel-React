import DataTable from 'react-data-table-component';
import { useState, useEffect } from 'react';
import { useBooks } from '../context/BookContext';
import { useNavigate } from 'react-router-dom';

function DatatablePage() {
    const { books, loadBooks, deleteBook } = useBooks();
    const navigate = useNavigate();

    useEffect(() => {
        loadBooks();
    }, [])


    const [searchText, setSearchText] = useState('');

    const handleSearch = (e) => {
        const value = e.target.value || '';
        setSearchText(value);
    };

    const filteredData = books.filter(item =>
        Object.keys(item).some(key =>
            String(item[key]).toLowerCase().includes(searchText.toLowerCase())
        )
    );

    const handleDelete = (row) => {
        if (confirm(`Esta seguro que quieres eliminar el libro ${row.Titulo}`)) {
            deleteBook(row.LibroID)
        }
    }

    const columns = [
        {
            name: 'Titulo',
            selector: row => row.Titulo,
            sortable: true,
        },
        {
            name: 'Genero',
            selector: row => row.Genero
        },
        {
            name: 'Editorial',
            selector: row => row.Editorial,
            sortable: true
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
                    <button className='px-1 ' onClick={() => navigate(`/new/${row.LibroID}`)}>✏️</button>
                    <button className='px-1' onClick={() => handleDelete(row)}>❌</button>
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