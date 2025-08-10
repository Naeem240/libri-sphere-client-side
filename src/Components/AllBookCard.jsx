import React from 'react';
import { Link, NavLink } from 'react-router';
import { RiDeleteBin6Fill, RiEdit2Fill } from 'react-icons/ri';
import { Rate } from 'antd';


const AllBookCard = ({ allBook, onlyAvailable  }) => {
    return (
        <>
            <div className="overflow-x-auto w-11/12 mx-auto my-6">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Name & Photo</th>
                            <th>Author Name</th>
                            <th>Category</th>
                            <th>Quantity</th>
                            <th>Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            allBook.map((book, index) =>
                                <tr key={index} className={`${book.quantity ==0 && onlyAvailable ? 'hidden':'' }`}>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask h-20 w-15">
                                                    <img
                                                        src={book?.image}
                                                        alt={book?.name} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold text-xs lg:text-[16px]">{book?.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {book?.authorName}
                                    </td>
                                    <td>{book?.category}</td>
                                    <td>{book?.quantity}</td>
                                    <td><Rate disabled allowHalf value={parseFloat(book?.rating)} /></td>
                                    <td>
                                        <NavLink viewTransition to={`/books/${book.category}/${book._id}`} className="btn btn-xs">Details</NavLink>
                                    </td>
                                    <th>
                                        <Link viewTransition to={`/update-book/${book._id}`} className="btn btn-ghost btn-xs"><RiEdit2Fill /></Link>
                                    </th>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            {/* <NavLink viewTransition to='/add-my-listings' className='btn btn-primary border-secondary text-secondary w-3/5 lg:w-1/5 rounded-full opacity-80 font-bold mx-auto mb-6 flex'>Add More</NavLink> */}
        </>
    );
};

export default AllBookCard;