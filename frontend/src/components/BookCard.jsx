export default function BookCard({ titulo, genero, imagenPortada }) {
    const imageURL = `http://localhost:8000/storage/${imagenPortada}`;

    return (
        <div className="border rounded-md p-4">
            <img src={imageURL} alt="Portada del libro" style={{ maxWidth: '100%', height: 'auto' }} />
            <header className="flex justify-between">
                <h2 className="text-sm font-bold">{titulo}</h2>
            </header>
            <p className="text-xs">{genero}</p>
        </div>
    )
}