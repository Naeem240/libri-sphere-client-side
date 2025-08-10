import React from 'react';
import { Pagination, Scrollbar, A11y, Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Link } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion } from "motion/react";
const Banner = () => {
    return (
        // <div className='flex items-center justify-between px-4 gap-10 mt-2 border-b pb-4 flex-col-reverse md:flex-row md:h-[70vh]'>
        //     <div className='w-full md:w-1/2'>
        //         <h1 className='text-3xl md:text-6xl'>Effortless Library Management</h1>
        //         <p className='md:text-2xl mt-2 text-gray-700 dark:text-gray-400'>
        //             Simplify cataloging, circulation, and patron services. Your complete solution for modern libraries.
        //         </p>
        //         <Link to='/login' className='btn btn-secondary mt-4 text-2xl'>
        //             Get Started
        //         </Link>
        //     </div>
        //     <div className='w-full md:w-1/2 h-full flex justify-end'>
        //         <img className='rounded-xl border-2 border-secondary w-full h-auto object-cover ' src="https://i.ibb.co/V0GJLDmM/Gemini-Generated-Image-ec6dn4ec6dn4ec6d.png" alt="Libri-Banner" />
        //     </div>
        // </div>
        <div className='relative lg:mt-1 pb-2'>
            <div className='w-full h-60 md:h-80 lg:h-100 text-center z-2 absolute backdrop-brightness-40'>
                <div className='h-60 md:h-80 lg:h-100 flex items-center justify-center'>
                    <div>
                        <motion.h1
                            animate={{ rotateX: [0, 90, 0], scale: [0.5, 1] }}
                            transition={{ duration: 2 }}
                            className='text-3xl md:text-6xl text-white'>
                            Welcome To <motion.span
                                // animate={{color: ['orange', 'gold', 'tomato', 'gold', 'orange']}}
                                // transition={{ duration: 5}}
                                className='ml-2'
                                animate={
                                    {
                                        color: ['#ff5733', '#33ff33', '#8a33ff', '#33ff33', '#ff5733'],
                                        transition: { duration: 20, repeat: Infinity }
                                    }}
                            > LibriSphere...
                            </motion.span>
                        </motion.h1>
                        <p className='mx-4 md:text-2xl mt-2 text-white opacity-70'>
                            Simplify cataloging, circulation, and patron services. Your complete solution for modern libraries.
                        </p>
                        <motion.div
                            animate={{ scale: [1, 1.05, 1]}}
                            transition={{ duration: 5, repeat: Infinity }}
                            className='border inline-block mt-4 rounded-full border-white'
                        >
                            <Link
                                to='/all-books' className='rounded-full btn btn-secondary txt-xl lg:text-2xl w-60 py-4 lg:py-7'>
                                <span>
                                    Get Started
                                </span>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
            <Swiper
                className='h-60 md:h-80 lg:h-100 '
                // install Swiper modules
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                autoplay={{
                    delay: 10000,
                    disableOnInteraction: true,
                }}
                modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
            >
                <SwiperSlide className=''>
                    <div className='flex justify-between'>
                        <motion.img
                            animate={{ y: [-20, -5, -20] }}
                            transition={{ duration: 5, repeat: Infinity }}
                            className='w-100'
                            src="https://cdn.pixabay.com/photo/2018/04/24/11/32/book-3346785_1280.png"
                            alt=""
                        />

                        <motion.img
                            animate={{ y: [-5, -20, -5] }}
                            transition={{ duration: 10, delay: 2, repeat: Infinity }}
                            className='w-50'
                            src="https://cdn.pixabay.com/photo/2018/04/22/22/25/book-3342628_1280.png"
                            alt=""
                        />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='flex justify-between'>
                        <motion.img
                            animate={{ y: [-20, -5, -20] }}
                            transition={{ duration: 10, repeat: Infinity }}
                            className='w-full'
                            src="https://cdn.pixabay.com/photo/2024/03/19/19/08/book-8643905_1280.jpg"
                            alt=""
                        />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='flex justify-between'>
                        <motion.img
                            animate={{ y: [-20, -5, -20] }}
                            transition={{ duration: 10, repeat: Infinity }}
                            className='w-full'
                            src="https://cdn.pixabay.com/photo/2014/09/05/18/32/old-books-436498_1280.jpg"
                            alt=""
                        />
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banner;