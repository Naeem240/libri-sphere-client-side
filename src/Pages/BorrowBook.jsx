import React, { use, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import BookList from '../Components/BookList';
import { AuthContext } from '../Contexts/AuthContext';
import { BiError } from 'react-icons/bi';
import { Helmet } from 'react-helmet';

const BorrowBook = () => {

    // Jump to Top
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const bookList = useLoaderData()
    const { user } = use(AuthContext)
    const userBookList = bookList.filter(book => book.email == user.email)

    const [bookLength, setBookLength] = useState(userBookList.length)

    // console.log(bookList);
    return (
        <div>
            <Helmet>
                <title>LibriSphere || Borrowed Books</title>
            </Helmet>
            <h1 className='text-3xl text-center mt-4 text-secondary border-b-2 pb-4 font-bold'>Borrowed Book Lists</h1>
            {
                bookLength ?
                    <BookList allBooks={userBookList} bookLength={setBookLength} setBookLength={setBookLength} showFilter = {false} />
                    :
                    <div className='h-[40vh] flex flex-col items-center justify-center'>
                        <BiError className='w-20 h-20 text-red-700' />
                        <h1 className='text-center font-bold text-3xl text-red-700'>Sorry! <br /> You have not yet borrowed any book.</h1>
                    </div>
            }
        </div>
    );
};

export default BorrowBook;