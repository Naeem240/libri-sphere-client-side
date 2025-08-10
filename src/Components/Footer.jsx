import React from 'react';
import { FaFacebook, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { LiaLinkedin } from 'react-icons/lia';
import { navLink4Footer } from './Navlink';
import { Link } from 'react-router';

const Footer = () => {
    return (
        <div className='bg-gray-600 flex flex-col items-center py-15 gap-8'>
            <div className='flex items-center gap-2'>
                <img className='w-8' src="/logo.png" alt="LibriSphere" />
                <h1 className='font-bold'>LibriSphere</h1>
            </div>
            <div className='text-sm md:text-lg mx-4'>
                {navLink4Footer}
            </div>
            <div className='w-2/3 bg-gray-500 h-0.5'></div>
            <div className='flex gap-4'>
                <a href="https://www.facebook.com/" target='blank'><FaFacebook className='w-6 h-6' /></a>
                <a href="https://x.com/" target='blank'><FaXTwitter className='w-6 h-6' /></a>
                <a href="https://www.linkedin.com/" target='blank'><LiaLinkedin className='w-6 h-6' /></a>
                <a href="https://www.youtube.com/" target='blank'><FaYoutube className='w-6 h-6' /></a>
            </div>
        </div>
    );
};

export default Footer;