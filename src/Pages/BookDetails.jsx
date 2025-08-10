import React, { use, useEffect, useState } from 'react';
import { BiCategoryAlt } from 'react-icons/bi';
import { IoLocationOutline } from 'react-icons/io5';
import { MdDateRange } from 'react-icons/md';
import { useLoaderData, Link } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Rate } from 'antd';
import { Helmet } from 'react-helmet';

const borrowedBookPromise = fetch('https://libri-sphere-server.vercel.app/borrowed-books').then(res => res.json());

const BookDetails = () => {

    // Jump to Top
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const book = useLoaderData();
    const borrowedBooks = use(borrowedBookPromise);
    // console.log(borrowedBooks);
    const { user } = use(AuthContext)
    const matchedBook = borrowedBooks.find(bk => bk.email === user.email && bk.name === book.name);

    //console.log('matchedBook', matchedBook);
    // console.log('book', book);
    // console.log('borrowedBooks', borrowedBooks);

    const today = new Date(); // Gets the current date and time

    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed, so add 1 and pad with '0' if needed
    const day = today.getDate().toString().padStart(2, '0'); // Pad with '0' if needed

    const formattedDate = `${year}-${month}-${day}`;

    // console.log(formattedDate);


    const [qty, setQty] = useState(book.quantity);
    const [disable, setDisable] = useState(false);

    const rating = parseFloat(book?.rating)
    // console.log(rating)


    const handleBorrowNow = (e) => {
        // e.preventDefault();
        const form = e.target;
        const date = form.date.value;
        const name = form.name.value;
        const email = form.email.value;
        // const borrowQty = form.borrowQty.value;
        // // (borrowQty);

        const bookQty = parseInt(book.quantity) - 1;
        book.quantity = bookQty

        // console.log(bookQty);
        setQty(bookQty);
        setDisable(true);


        // Update Quantity to Database
        axios.patch(`https://libri-sphere-server.vercel.app/books/${book.category}/${book._id}`, { quantity: bookQty })
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Added To Borrowed List`,
                    showConfirmButton: false,
                    timer: 1500
                });
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
        delete book._id;

        const borrowedBook = { ...book, borrowedDate: formattedDate, returnDate: date, borrowedBy: name, email: email };
        //console.log(borrowedBook);

        // Send to Borrowed Book DB
        axios.post('https://libri-sphere-server.vercel.app/borrowed-books', borrowedBook)
            .then((res => console.log(res.data)))
            .catch(err => console.log(err))

    }

    return (
        <>
            <Helmet>
                <title>{book.name}</title>
            </Helmet>
            <div className='lg:px-16 mt-2 mx-4 lg:mx-0'>
                <div>
                    <h1 className='text-center text-3xl mb-4 underline text-secondary'>
                        {book?.name}
                    </h1>
                </div>
                <div className='md:flex gap-4 justify-center items-center mb-4'>
                    <div className='rounded-xl  md:w-1/3'>
                        <img className='m-auto border-1 border-secondary object-cover object-center rounded-xl mb-2 md:mb-0' src={book?.image} alt="" />
                    </div>
                    <div className='border-1 border-secondary p-4 w-full lg:w-[40%] rounded-xl'>
                        <h1 className=' mb-4 text-xl text-justify'>{book.shortDescription}</h1>
                        <div>
                            <h1 className='text-lg '>
                                Name: <span className='text-xl  text-secondary'>{book?.name}</span>
                            </h1>
                        </div>
                        <div>
                            <h1 className='text-lg '>
                                Author: <span className='text-xl  text-secondary'>{book?.authorName}</span>
                            </h1>
                        </div>
                        <div>
                            <h1 className='text-lg '>
                                Category: <span className='text-xl  text-secondary'>{book?.category}</span>
                            </h1>
                        </div>
                        <div>
                            <h1 className='text-lg '>
                                Available Quantity: <span className='text-xl  text-secondary'>{qty}</span>
                            </h1>
                        </div>
                        <div>
                            <h1 className='text-lg '>
                                Rating: <span className='text-xl  text-secondary'><Rate className='relative top-0.5 left-1' disabled allowHalf value={rating} /></span>
                            </h1>
                        </div>
                        {/* <div>
                            <h1 className='text-lg '>
                                Book ID: <span className='text-xl  text-secondary'>{book?.bookId}</span>
                            </h1>
                        </div> */}
                        {/* Open the modal using document.getElementById('ID').showModal() method */}
                        {
                            qty == 0 ?
                                matchedBook || disable ?
                                    <>
                                        <div className="badge badge-success mt-4 rounded-full mr-2">
                                            <svg className="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor" strokeLinejoin="miter" strokeLinecap="butt"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeLinecap="square" stroke-miterlimit="10" strokeWidth="2"></circle><polyline points="7 13 10 16 17 8" fill="none" stroke="currentColor" strokeLinecap="square" stroke-miterlimit="10" strokeWidth="2"></polyline></g></svg>
                                            Borrowed
                                        </div>
                                        <div className="badge badge-error mt-4 rounded-full">
                                            <svg className="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor"><rect x="1.972" y="11" width="20.056" height="2" transform="translate(-4.971 12) rotate(-45)" fill="currentColor" strokeWidth={0}></rect><path d="m12,23c-6.065,0-11-4.935-11-11S5.935,1,12,1s11,4.935,11,11-4.935,11-11,11Zm0-20C7.038,3,3,7.037,3,12s4.038,9,9,9,9-4.037,9-9S16.962,3,12,3Z" strokeWidth={0} fill="currentColor"></path></g></svg>
                                            Unavailable
                                        </div>
                                        <Link viewTransition to='/borrowed-books' className='relative top-2 left-10 text-xs underline text-blue-700'>Borrowed Book List</Link>
                                    </>
                                    :
                                    <>
                                        <div className="badge badge-error mt-4 rounded-full">
                                            <svg className="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor"><rect x="1.972" y="11" width="20.056" height="2" transform="translate(-4.971 12) rotate(-45)" fill="currentColor" strokeWidth={0}></rect><path d="m12,23c-6.065,0-11-4.935-11-11S5.935,1,12,1s11,4.935,11,11-4.935,11-11,11Zm0-20C7.038,3,3,7.037,3,12s4.038,9,9,9,9-4.037,9-9S16.962,3,12,3Z" strokeWidth={0} fill="currentColor"></path></g></svg>
                                            Unavailable
                                        </div>
                                        <Link viewTransition to='/borrowed-books' className='relative top-2 left-10 text-xs underline text-blue-700'>Borrowed Book List</Link>
                                    </>
                                :
                                matchedBook || disable ?
                                    <>
                                        <div className="badge badge-success mt-4 rounded-full">
                                            <svg className="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor" strokeLinejoin="miter" strokeLinecap="butt"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeLinecap="square" stroke-miterlimit="10" strokeWidth="2"></circle><polyline points="7 13 10 16 17 8" fill="none" stroke="currentColor" strokeLinecap="square" stroke-miterlimit="10" strokeWidth="2"></polyline></g></svg>
                                            Borrowed
                                        </div>
                                        <Link viewTransition to='/borrowed-books' className='relative top-2 left-10 text-xs underline text-blue-700'>Borrowed Book List</Link>
                                    </>
                                    : <></>

                        }
                        <button disabled={qty == 0 || matchedBook || disable ? true : false} className="btn btn-secondary border-2 btn-outline mt-1 w-full py-1 rounded-full cursor-pointer" onClick={() => document.getElementById('my_modal_1').showModal()}>Borrow</button>
                        <dialog id="my_modal_1" className="modal">
                            <div className="modal-box">
                                {/* <h3 className="font-bold text-lg">Hello!</h3>
                                <p className="py-4">Press ESC key or click the button below to close</p> */}
                                <form onSubmit={handleBorrowNow} method="dialog" className='space-y-2'>
                                    <label className='text-gray-500'>Name:</label>
                                    <input readOnly className='border w-full p-2 rounded-lg' type="text" name="name" id="" value={user?.displayName} />
                                    <label className='text-gray-500'>Email:</label>
                                    <input readOnly className='border w-full p-2 rounded-lg' type="email" name="email" id="" value={user.email} />
                                    <label className='text-gray-500'>Add Return Date:</label>
                                    <input required className='border w-full p-2 rounded-lg' type="date" min={formattedDate} name="date" id="" />
                                    <button type='submit' className="btn btn-secondary mt-4">Borrow Now</button>
                                </form>
                                <div className="modal-action">

                                    <form method="dialog">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button className="btn btn-error">Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>

                        {/* <button className="btn btn-secondary border-2 btn-outline mt-4 w-full" >Borrow Now</button> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookDetails;