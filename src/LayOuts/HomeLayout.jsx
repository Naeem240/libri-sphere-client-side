import React, { useState } from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const HomeLayout = () => {
    const [theme, setTheme] = useState(true)
    return (
        <div data-theme={`${theme?'light':'dark'}`}>
            <header>
                <div className='pt-15'></div>
                <Navbar
                theme={theme}
                setTheme={setTheme}
                />
            </header>
            <main>
                <Outlet/>                
            </main>
            <footer>
                <Footer/>
            </footer>
        </div>
    );
};

export default HomeLayout;