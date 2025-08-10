import { Link, NavLink } from "react-router";

export const navLink4Header =
    <ul className="flex gap-2 lg:gap-6 flex-col lg:flex-row">
        <li><NavLink viewTransition className='btn btn-outline btn-secondary w-full shadow-lg lg:shadow-none lg:w-auto' to='/'>Home</NavLink></li>
        <li><NavLink viewTransition className='btn btn-outline btn-secondary w-full shadow-lg lg:shadow-none lg:w-auto' to='/all-books'>All Books</NavLink></li>
        <li><NavLink viewTransition className='btn btn-outline btn-secondary w-full shadow-lg lg:shadow-none lg:w-auto' to='/add-books'>Add Book</NavLink></li>
        <li><NavLink viewTransition className='btn btn-outline btn-secondary w-full shadow-lg lg:shadow-none lg:w-auto' to='/borrowed-books'>Borrowed Books</NavLink></li>
    </ul>

export const navLink4Footer =
    <ul className="flex gap-6">
        <li><Link viewTransition to='/' >Home</Link></li>
        <li><Link viewTransition>Terms And Conditions</Link></li>
        <li><Link viewTransition>Privacy Policy</Link></li>
        <li><Link viewTransition>Contact</Link></li>
    </ul>