import React, { useEffect } from 'react';
import BookList from '../Components/BookList';
import { useLoaderData } from 'react-router';
import { Helmet } from 'react-helmet';

const AllBooks = () => {

    // Jump to Top
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const allBooks = useLoaderData()
    return (
        <div>
            <Helmet>
                <title>LibriSphere || All Book</title>
            </Helmet>
            <div className=' relative my-4 text-secondary border-b-2 pb-4 font-bold '>
                <h1 className='text-3xl text-center'>Find Your Books</h1>
            </div>
            <BookList allBook={allBooks} showFilter = {true} />
        </div>
    );
};

export default AllBooks;