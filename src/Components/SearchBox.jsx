// src/components/SearchBox.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';

const API_BASE = import.meta.env.VITE_API_URL || 'https://libri-sphere-server.vercel.app';

export default function SearchBox({ user }) {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const containerRef = useRef(null);
    const abortRef = useRef(null);
    const debounceRef = useRef(null);

    // close when user clicks outside
    useEffect(() => {
        const onClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('click', onClickOutside);
        return () => document.removeEventListener('click', onClickOutside);
    }, []);

    // close on Escape
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') setOpen(false);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    // Debounced suggestions fetch
    useEffect(() => {
        const q = (query || '').trim();
        if (!q) {
            setSuggestions([]);
            setOpen(false);
            return;
        }

        setLoading(true);

        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(async () => {
            try {
                if (abortRef.current) abortRef.current.abort();
                abortRef.current = new AbortController();

                const res = await fetch(`${API_BASE}/books/search?q=${encodeURIComponent(q)}`, {
                    signal: abortRef.current.signal
                });
                if (!res.ok) throw new Error('Network response was not ok');
                const data = await res.json();
                setSuggestions(data.slice(0, 7)); // show up to 7 suggestions
                setOpen(true);
            } catch (err) {
                if (err.name !== 'AbortError') console.error(err);
            } finally {
                setLoading(false);
            }
        }, 300); // 300ms debounce

        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, [query]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const q = (query || '').trim();
        if (!q) return;
        setOpen(false);
        navigate(`/search?q=${encodeURIComponent(q)}`);
    };

    const handlePick = (book) => {
        setOpen(false);
        const category = book.category || 'all';
        navigate(`/books/${encodeURIComponent(category)}/${book._id}`);
    };

    // choose an image field depending on your DB schema
    const thumb = (book) => book.image || book.display_url || book.thumbnail || '/placeholder.png';

    return (
        <div ref={containerRef} className={`${user ? 'block' : 'hidden'} relative w-full max-w-md`}>
            <form onSubmit={handleSubmit} className="flex items-center border-2 border-secondary rounded-md overflow-hidden bg-white">
                <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search books, author or category..."
                    className="flex-1 px-3 py-2 outline-none"
                    aria-label="Search books"
                    onFocus={() => { if (suggestions.length) setOpen(true); }}
                />
                <button type="submit" className="btn btn-secondary px-3">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                </button>
            </form>

            {open && suggestions.length > 0 && (
                <ul className="absolute left-0 right-0 mt-1 bg-white border rounded shadow-lg z-50 max-h-64 overflow-auto">
                    {suggestions.map((book) => (
                        <li key={book._id}>
                            <button onClick={() => handlePick(book)} className="w-full text-left flex gap-3 items-center p-2 hover:bg-gray-50">
                                <img src={thumb(book)} alt={book.name} className="w-12 h-16 object-cover rounded" />
                                <div className="flex-1">
                                    <div className="font-medium truncate">{book.name}</div>
                                    <div className="text-sm opacity-70 truncate">{book.author}</div>
                                </div>
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {loading && (
                <div className="absolute right-2 top-2">…</div>
            )}
        </div>
    );
}