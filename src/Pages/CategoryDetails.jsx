import React, { useEffect } from 'react';
import AllBooks from './AllBooks';
import { useLoaderData, useParams } from 'react-router';
import BookList from '../Components/BookList';
import { Helmet } from 'react-helmet';

const CategoryDetails = () => {

    // Jump to Top
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const booksByCategory = useLoaderData();
    //console.log(booksByCategory);
    const category = useParams()
    return (
        <div>
            <Helmet>
                <title>LibriSphere || Category</title>
            </Helmet>

            <h1 className='text-3xl text-center my-4 text-secondary border-b-2 pb-4 font-bold'>{category.category}</h1>
            <BookList allBooks={booksByCategory} />
        </div>
    );
};

export default CategoryDetails;