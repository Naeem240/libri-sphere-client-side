import React, { use, useState } from 'react';
import { navLink4Header } from './Navlink';
import { CgProfile } from 'react-icons/cg';
import { Link, Links, NavLink } from 'react-router';
import { CiLight } from 'react-icons/ci';
import { MdLightMode } from 'react-icons/md';
import { AiOutlineMenuUnfold } from 'react-icons/ai';
import { AuthContext } from '../Contexts/AuthContext';
import { Tooltip } from 'react-tooltip';
import Swal from 'sweetalert2';

const Navbar = ({ theme, setTheme }) => {
    const [menu, setMenu] = useState(false);

    const { user, loading, logOut, setLoading } = use(AuthContext)

    const handleLogout = () => {
        setLoading(true)
        logOut()
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Log Out Successfull",
                    showConfirmButton: false,
                    timer: 1500
                });
                setLoading(false)
            })
            .catch((error) => {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: `${error}`,
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    }
    return (
        <nav className='flex items-center justify-between border-b fixed top-0 z-10 w-full py-2 bg-accent'>
            <div className="pl-4 lg:hidden block">
                <AiOutlineMenuUnfold onClick={() => { setMenu(!menu) }} className='p-1 w-9 h-9 btn btn-secondary btn-outline mr-2' />
            </div>

            <div onClick={() => { setMenu(!menu) }} className={` lg:hidden flex `}>
                <div className={`absolute ${menu ? 'left-0' : '-left-200'} top-0 w-4/5 sm:w-3/5 h-screen transition-all duration-500 backdrop-blur-[100px]`}>
                    <Link viewTransition to='/' className='flex items-center mr-2 lg:pl-4 my-4 ml-4'>
                        <img className='w-10 object-center object-cover sm:w-12' src="/logo.png" alt="LibriSphere" />
                        <h1 className='ml-1 text-xl text-secondary font-bold'>Libri<span className=''>Sphere</span></h1>
                    </Link>
                    <div className='mx-4'>
                        {navLink4Header}
                    </div>
                </div>
                <div className={`absolute w-1/5 sm:w-2/5 right-0 top-0 backdrop-brightness-75 h-screen ${menu ? 'block' : 'hidden'}`}>
                </div>
            </div>

            <Link viewTransition to='/' className='flex items-center mr-2 lg:pl-4'>
                <img className='w-15 object-center object-cover sm:w-12' src="/logo.png" alt="LibriSphere" />
                <h1 className='ml-1 text-xl text-secondary font-bold hidden sm:block'>Libri<span className=''>Sphere</span></h1>
            </Link>
            <div className='hidden lg:block mr-2'>
                {navLink4Header}
            </div>
            <label className="input border-2 border-secondary mr-2 -z-20">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <form className='w-12/12 flex items-center justify-between' action="">
                    <input className='w-full' type="search" required placeholder="Search Books Here..." />
                    <button className='border btn btn-secondary shadow-none -mr-4' type='submit'>
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                    </button>
                </form>
            </label>
            <div className='flex items-center gap-2 pr-4'>
                {
                    loading ?
                        <span className="loading loading-dots loading-xl text-secondary"></span>
                        :
                        user ?
                            <h1 className='text-secondary hidden lg:block'>{user.email.slice(0, 8)}...</h1>
                            :
                            <Link viewTransition to='/login' className='btn btn-secondary rounded-full hidden lg:flex'>Log In</Link>
                    // user ?
                    //     loading? <span className="loading loading-spinner text-secondary"></span>:<h1>{user.email}</h1>
                    //     :
                    //     <Link viewTransition to='/login' className='btn btn-secondary text-primary'>Log In</Link>
                }
                {/* <Link viewTransition to='/login' className='btn btn-secondary rounded-full hidden lg:flex'>Log In</Link> */}
                {/* <CgProfile className='p-1 w-9 h-9 btn btn-secondary rounded-full' /> */}
                {
                    loading ? <span className="loading loading-dots loading-xl text-secondary"></span> :
                        user ?
                            <>
                                <img data-tooltip-id='profile-tooltip' src={user.photoURL} alt={user.displayName} className='cursor-pointer p-1 w-9 h-9 bg-secondary text-primary rounded-full' />
                            </>
                            : <CgProfile data-tooltip-id='profile-tooltip' className='cursor-pointer p-1 w-9 h-9 btn btn-secondary rounded-full' />
                }
                <Tooltip clickable id='profile-tooltip'>
                    <div className='px-4 w-50 text-center'>

                        <h1 className='text-xl font-bold underline'>
                            {
                                user?.email ?
                                    'Your Account'
                                    :
                                    'Login/Sign Up'
                            }
                        </h1>
                        <p className='text-lg font-bold'>{
                            user?.displayName ||
                            <>
                                <Link to='/login' className='btn w-full my-2'>Login</Link>
                                <Link to='/register' className='btn w-full my-2'>Register</Link>
                            </>
                        }
                        </p>
                        <p className='text-lg font-bold opacity-70'>{user?.email}</p>
                        {
                            user?.email &&
                            <button onClick={handleLogout} className='btn w-full my-2'>Log Out</button>
                        }
                    </div>
                </Tooltip>
            </div>
            {
                theme ?
                    <CiLight onClick={() => setTheme(!theme)} className='fixed bottom-5 right-0 bg-secondary text-gray-200 w-20 rounded-l-box h-15 py-2 cursor-pointer' />
                    :
                    <MdLightMode onClick={() => setTheme(!theme)} className='fixed bottom-5 right-0 bg-secondary text-gray-200 w-20 rounded-l-box h-15 py-2 cursor-pointer' />
            }
        </nav>
    );
};

export default Navbar;