import axios from 'axios';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Swal from 'sweetalert2';

const AddBook = () => {

    // Jump to Top
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    // Handle Add Book Button
    const handleAddBook = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const newBook = Object.fromEntries(formData.entries());
        // console.log(newBook);

        // Send to DB
        axios.post('https://libri-sphere-server.vercel.app/books', newBook)
            .then(() => {
                // console.log(data)
                Swal.fire({
                    title: "Great",
                    text: "Book Added Successfully!",
                    icon: "success"
                });
                form.reset();
                // navigate('/my-listings')
            })


    }
    return (
        <>
            <Helmet>
                <title>LibriSphere || Add Book</title>
            </Helmet>
            <div className='my-10 flex items-center'>
                <form onSubmit={handleAddBook} className="fieldset bg-secondary border-base-300 rounded-box mx-auto w-11/12">
                    <h1 className="text-3xl text-white flex justify-center font-bold underline my-2">Add Book</h1>
                    <div className='grid grid-cols-2 gap-6 p-6'>
                        <div>
                            <label className="label text-white">Book Photo URL:</label><br />
                            <input required name='image' type="text" className="input w-full" placeholder='Book Cover Image' />
                        </div>
                        <div>
                            <label className="label text-white">Book Name:</label><br />
                            <input required name='name' type="text" className="input w-full" placeholder='Name' />
                        </div>
                        <div>
                            <label className="label text-white">Quantity:</label><br />
                            <input required name='quantity' type='number' min={1} className="input w-full" placeholder="Quantity" />
                        </div>
                        <div>
                            <label className="label text-white">Author Name:</label><br />
                            <input required name='authorName' type="text" className="input w-full" placeholder="Author" />
                        </div>
                        <div>
                            <label className="label text-white">Category</label><br />
                            <select name='category' className="select w-full cursor-pointer">
                                <option disabled={true}>Select Category</option>
                                <option className='cursor-pointer'>Biography & History</option>
                                <option className='cursor-pointer'>Islamic Thought</option>
                                <option className='cursor-pointer'>Hadith Collection</option>
                                <option className='cursor-pointer'>Quran & Tafsir</option>
                            </select>
                        </div>
                        <div>
                            <label className="label text-white">Short Description</label><br />
                            <textarea required name='shortDescription' type='text' className="input w-full" placeholder="Description" />
                        </div>
                        <div>
                            <label className="label text-white">Rating</label><br />
                            <input required name='rating' type='number' step={0.1} max={5} min={1} className="input w-full" placeholder="Rating" />
                        </div>
                        <div>
                            <label className="label text-white">Add Button</label><br />
                            <input required name='addButton' type="text" className="input w-full" placeholder="Submit the Book Details" />
                        </div>

                        <div className='col-span-2'>
                            <label className="label text-white">Book Content</label><br />
                            <input required name='bookContent' type='text' className="input w-full col-span-2" placeholder="More Information" />
                        </div>

                        <input type='submit' className="col-span-2 btn btn-success btn-outline dark:text-white dark:border-white my-4 w-1/2 mx-auto text-lg" value='Add Book' />
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddBook;