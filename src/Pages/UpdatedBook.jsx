import axios from 'axios';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';

const UpdatedBook = () => {

    // Jump to Top
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const book = useLoaderData();
    // console.log(book)

    const handleUpdate = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const updatedDetails = Object.fromEntries(formData.entries())
        const updatedBook = { ...book, ...updatedDetails }
        // console.log('Old Book', book); //Okay
        // console.log('New Book', updatedBook); //Okay

        axios.put(`https://libri-sphere-server.vercel.app/books/${updatedBook.category}/${updatedBook._id}`, updatedDetails)
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Updated Successful`,
                    showConfirmButton: false,
                    timer: 2500
                });
            })
            .catch(err => {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: `${err}`,
                    showConfirmButton: false,
                    timer: 2500
                });
            })

    }
    return (
        <>
            <Helmet>
                <title>LibriSphere || Update Book</title>
            </Helmet>
            <div className='my-10 flex items-center'>
                <form onSubmit={handleUpdate} className="fieldset bg-secondary border-base-300 rounded-box mx-auto w-11/12">
                    <h1 className="text-3xl text-white flex justify-center font-bold underline my-2">Update Book</h1>
                    <div className='grid grid-cols-2 gap-6 p-6'>
                        {/* Photo */}
                        <div className='col-span-2'>
                            <label className="label text-white">Book Photo URL:</label><br />
                            <input defaultValue={book.image} required name='image' type="text" className="input w-full" placeholder='Book Cover Image' />
                        </div>

                        {/* Book Name */}
                        <div>
                            <label className="label text-white">Book Name:</label><br />
                            <input defaultValue={book.name} required name='name' type="text" className="input w-full" placeholder='Name' />
                        </div>

                        {/* Author  */}
                        <div>
                            <label className="label text-white">Author Name:</label><br />
                            <input defaultValue={book.authorName} required name='authorName' type="text" className="input w-full" placeholder="Author" />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="label text-white">Category</label><br />
                            <select defaultValue={book.category} name='category' className="select w-full cursor-pointer">
                                <option disabled={true}>Select Category</option>
                                <option className='cursor-pointer'>Biography & History</option>
                                <option className='cursor-pointer'>Islamic Thought</option>
                                <option className='cursor-pointer'>Hadith Collection</option>
                                <option className='cursor-pointer'>Quran & Tafsir</option>
                            </select>
                        </div>

                        {/* Rating */}
                        <div>
                            <label className="label text-white">Rating</label><br />
                            <input defaultValue={parseFloat(book.rating)} required name='rating' type='number' step={0.1} max={5} min={1} className="input w-full" placeholder="Rating" />
                        </div>



                        <input type='submit' className="col-span-2 btn btn-success btn-outline dark:text-white dark:border-white my-4 w-1/2 mx-auto text-lg" value='Confirm Update' />
                    </div>
                </form>
            </div>
        </>
    );
};

export default UpdatedBook;