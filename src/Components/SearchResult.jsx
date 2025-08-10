// src/pages/SearchResults.jsx
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import BookList from './BookList';
import Loading from './Loading';
import { Slide } from 'react-awesome-reveal';
import { Rate } from 'antd';

const API_BASE = import.meta.env.VITE_API_URL || 'https://libri-sphere-server.vercel.app';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function SearchResults() {
    // Jump to Top
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    const query = useQuery();
    const q = query.get('q') || '';
    // const navigate = useNavigate();

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
            {loading && <div><Loading /></div>}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 w-11/12 mx-auto my-6">
                {books.map((book) => (
                    <Slide
                        className={`${book.quantity == 0 ? 'hidden' : 'block'}`}

                        key={book._id} cascade damping={0.05} duration={800} triggerOnce>

                        <div className={`rounded-2xl  min-h-full hover:shadow-xl ${!book?.returnDate ? 'cursor-pointer hover:border' : 'cursor-auto'}`}>
                            <div className='relative'>
                                <img className='min-h-[65vh] w-full object-cover object-top rounded-t-2xl' src={book.image} alt={book.Name} />
                                {
                                    book.quantity == 0 ?
                                        <div className='flex gap-8 absolute -bottom-4 left-[2%]'>
                                            {!book?.returnDate && <h2 className='bg-red-700 text-white px-3 rounded-full py-1 font-bold border'>Not Available</h2>}
                                        </div>
                                        :
                                        <div className='flex gap-8 absolute -bottom-4 left-[2%]'>
                                            {!book?.returnDate && <h2 className='bg-secondary text-white px-3 rounded-full py-1 font-bold border'>Available</h2>}
                                        </div>

                                }
                            </div>
                            <div className='py-6 px-2'>
                                <h1 className='font-bold h-12 overflow-clip'>{book.name}</h1>
                                {
                                    !book?.returnDate && <h2 className='opacity-90 my-1 text-xs truncate'>{book.authorName}</h2>
                                }
                                <p className='opacity-70 text-sm'>{book.category}</p>
                                {
                                    !book?.returnDate && <p className='opacity-70 text-sm'>{book.quantity} available</p>
                                }
                                {/* <Rate disabled allowHalf value={parseFloat(book?.rating)} /> */}


                                <>
                                    <Link to={`/books/${book.category}/${book._id}`}><button className='btn btn-secondary btn-outline w-full mt-2'>Details</button></Link>
                                    <Link to={`/update-book/${book._id}`}><button className='btn btn-secondary btn-outline w-full mt-2'>Update</button></Link>
                                </>
                            </div>
                            {/* <div className='px-6 pb-6 flex justify-between'>
                                    <NavLink viewTransition className='btn btn-primary btn-outline text-secondary border-secondary w-full'>See Details</NavLink>
                                </div> */}
                        </div>
                    </Slide>
                ))}
            </div>
        </div>
    );
}