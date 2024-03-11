import { Link } from "react-router-dom";

function Navbar() {
    return (
        <div className="bg-neutral-800 flex flex-col sm:flex-row justify-between text-white px-4 sm:px-20 py-4">
            <Link to="/" className="text-white font-bold text-center sm:text-left">
                <h1>React + Laravel</h1>
            </Link>

            <ul className="flex gap-x-2 text-white justify-center sm:justify-end mt-4 sm:mt-0">
                <li><Link to="/data-table" className="px-2 py-1 font-semibold">Data Table</Link></li>
                <li><Link to="/new" className="px-2 py-1 font-semibold">Crear Libro</Link></li>
            </ul>
        </div>
    );
}

export default Navbar;
