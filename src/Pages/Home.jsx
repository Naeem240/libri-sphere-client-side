import React, { useEffect } from 'react';
import Banner from '../Components/Banner';
import { useLoaderData } from 'react-router';
import BookList from '../Components/BookList';
import Categories from '../Components/Categories';
import Services from '../Components/Services';
import SubscriptionForm from '../Components/SubscriptionForm';
import { Helmet } from 'react-helmet';

const Home = () => {

    // Jump to Top
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const allBooks = useLoaderData().slice(0, 6);
    return (
        <div>
            <Helmet>
                <title>LibriSphere || Home</title>
            </Helmet>
            <Banner />
            {/* <BookList allBooks = {allBooks}/> */}
            <Categories allBooks={allBooks} />
            <Services />
            <SubscriptionForm />
            <div className='h-30 w-full bg-gray-600'></div>
        </div>
    );
};

export default Home;