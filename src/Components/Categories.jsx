import React from 'react';
import { Slide } from 'react-awesome-reveal';
import { BiSolidCategoryAlt } from 'react-icons/bi';
import { Link } from 'react-router';

const Categories = ({ allBooks }) => {
    const categoriesSet = new Set(allBooks.map(book => book.category));
    const categories = [...categoriesSet];
        //console.log(categories)


    return (
        <div>
            <h1 className='text-3xl text-center my-4 text-secondary border-b-2 pb-4 font-bold'>Find Your Categories</h1>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mx-4 my-6'>
                {
                    categories.map((category, index) =>
                        <Slide key={index} cascade fraction={1} damping={0.5} duration={800} triggerOnce direction='right'>
                            <Link to={`/books/${category}`} className='rounded-2xl  min-h-full shadow-xl hover:border cursor-pointer flex flex-col items-center py-10'>
                                <BiSolidCategoryAlt className='h-15 w-15'/>
                                <h1 className='text-lg'>{category}</h1>
                            </Link>
                        </Slide>
                    )
                }
            </div>
        </div>
    );
};

export default Categories;