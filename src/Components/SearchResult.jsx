// src/pages/SearchResults.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import BookList from './BookList';
import Loading from './Loading';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function SearchResults() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    const query = useQuery();
    const q = query.get('q') || '';
    const navigate = useNavigate();

    useEffect(() => {
        const val = (q || '').trim();
        if (!val) {
            setBooks([]);
            return;
        }
        setLoading(true);
        fetch(`${API_BASE}/books/search?q=${encodeURIComponent(val)}`)
            .then((r) => r.json())
            .then((data) => setBooks(data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [q]);

    if (!q) return <div className="p-6">Please enter something to search.</div>;

    return (
        <div className="p-6">
            <h2 className="text-xl mb-4">Search results for "{q}" — {books.length}</h2>
            {loading && <div><Loading/></div>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {books.map((book) => (
                    <article key={book._id} className="bg-white p-4 rounded shadow">
                        <img src={book.image || book.display_url || '/placeholder.png'} alt={book.name} className="w-full h-40 object-cover rounded" />
                        <h3 className="font-semibold mt-2 truncate">{book.name}</h3>
                        <p className="text-sm text-gray-600">{book.author}</p>
                        <div className="mt-2 flex justify-end">
                            <button className="btn btn-sm btn-outline" onClick={() => navigate(`/books/${encodeURIComponent(book.category || 'all')}/${book._id}`)}>View</button>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}