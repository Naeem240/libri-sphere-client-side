import { Rate } from 'antd';
import axios from 'axios';
import React, { use, useState } from 'react';
import { Slide } from 'react-awesome-reveal';
import { Link, NavLink } from 'react-router';
import Swal from 'sweetalert2';
import AllBookCard from './AllBookCard';
import { AuthContext } from '../Contexts/AuthContext';

const allBookPromise = fetch('https://libri-sphere-server.vercel.app/books').then(res => res.json());

const BookList = ({ allBooks, setBookLength, showFilter }) => {

    const [allBook, setAllBooks] = useState(allBooks);

    const {user} = use(AuthContext)

    const books = use(allBookPromise);

    // console.log(books)





    const handleReturn = (id) => {

        const selectedBook = allBooks.find(book => book._id == id)

        const returnedBook = books.find(book => book.name == selectedBook.name)

        const remainingBook = allBooks.filter(book => book._id !== id)


        // Update Quantity
        axios.patch(`https://libri-sphere-server.vercel.app/books/${returnedBook.category}/${returnedBook._id}`, { quantity: parseInt(returnedBook.quantity) + 1 })
            .then(() => {
                // Delete From Borrowed Book 
                axios.delete(`https://libri-sphere-server.vercel.app/borrowed-books/${user.email}/${selectedBook._id}`)
                    .then(() => {
                        // console.log(res.data)
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `Return Successful`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        setAllBooks(remainingBook);
                        if (remainingBook.length === 0) {
                            setBookLength(0)
                        }
                    })
                    .catch(err => {
                        // console.log(err)
                        Swal.fire({
                            position: "top-end",
                            icon: "error",
                            title: `${err}`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    })
            })
            .catch(error => {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: `${error}`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            )
    }

    const [onlyAvailable, setOnlyAvailable] = useState(false)
    const [card, setCard] = useState(true);

    const handleFilter = (e) => {
        e.preventDefault();
        const selected = e.target.value
        // console.log(selected);
        if (selected === 'Only Available') {
            console.log('wow')
            setOnlyAvailable(true)
        }
        else {
            setOnlyAvailable(false)
        }
    }

    const handleCardView = (e) => {
        e.preventDefault();
        const selected = e.target.value;
        if(selected === 'Card'){
            setCard(true);
        }
        else{
            setCard(false);
        }
    }



    return (
        <>
            {
                showFilter &&
                <div className='flex justify-center gap-4'>
                    <form onChange={handleFilter} className='flex justify-center'>
                        <select name='category' className=" select cursor-pointer">
                            <option disabled={true} selected='selected'>Filter</option>
                            <option className='cursor-pointer'>Only Available</option>
                            <option className='cursor-pointer'>Show All</option>
                        </select>
                    </form>
                    <form onChange={handleCardView} className='flex justify-center'>
                        <select name='category' className=" select cursor-pointer">
                            <option disabled={true} selected='selected'>Card/Table</option>
                            <option className='cursor-pointer'>Card</option>
                            <option className='cursor-pointer'>Table</option>
                        </select>
                    </form>
                </div>
            }

            {
                !card?
                <AllBookCard allBook={allBook} onlyAvailable = {onlyAvailable} />
            :
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 w-11/12 mx-auto my-6'>
                {
                    allBook.map(book =>
                        <Slide
                            className={`${book.quantity == 0 && onlyAvailable ? 'hidden' : 'block'}`}

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
                                    <Rate disabled allowHalf value={parseFloat(book?.rating)} />

                                    {
                                        book?.returnDate ?
                                            <>
                                                <h1 className='text-[10px] sm:text-[15px] mt-1'>
                                                    Borrowed On: <span className='text-secondary'>{book?.borrowedDate}</span>
                                                </h1>
                                                <h1 className='text-[12px] sm:text-[16px]'>
                                                    Return By: <span className='text-red-700'>{book?.returnDate}</span>
                                                </h1>
                                                <button onClick={() => { handleReturn(book._id) }} className='btn btn-secondary btn-outline w-full mt-2'>Return</button>
                                            </>
                                            :
                                            <>
                                                <Link to={`/books/${book.category}/${book._id}`}><button className='btn btn-secondary btn-outline w-full mt-2'>Details</button></Link>
                                                <Link to={`/update-book/${book._id}`}><button className='btn btn-secondary btn-outline w-full mt-2'>Update</button></Link>
                                            </>
                                    }
                                </div>
                                {/* <div className='px-6 pb-6 flex justify-between'>
                                    <NavLink viewTransition className='btn btn-primary btn-outline text-secondary border-secondary w-full'>See Details</NavLink>
                                </div> */}
                            </div>
                        </Slide>
                    )
                }
            </div>
            }
            {/* <NavLink viewTransition to='/listings' className='btn btn-primary border-secondary text-secondary w-3/5 lg:w-1/5 rounded-full opacity-80 font-bold mx-auto mb-6 flex'>See More</NavLink> */}
        </>
    );
};

export default BookList;