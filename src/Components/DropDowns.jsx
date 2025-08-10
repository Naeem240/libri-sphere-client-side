import React from 'react';

const DropDowns = () => {
    return (
        <div>
            <li className="dropdown dropdown-hover cursor-pointer">
                <div tabIndex={0} role="button" className="inline-flex items-center gap-0.5 dropdown">
                    <div><CgProfile className='w-10 h-10 bg-' /></div>
                    <div className='flex'>
                        <div className='icon w-2 h-0.5 bg-white text-white rotate-45 opacity-50'></div>
                        <div className='icon w-2 h-0.5 bg-white text-white -rotate-45 opacity-50 -ml-1'></div>
                    </div>
                </div>
                <ul tabIndex={0} className="dropdown-content menu bg-[#10263f] mt-2 rounded-box z-1 w-52 p-2 shadow-lg text-white sub-menu">
                    <li className='sub-menu-list' >
                        <div className='flex justify-between'>
                            <a>item.label</a>
                            <div className='hidden go-icon'>&gt;</div>
                        </div>
                    </li>
                </ul>
            </li>
        </div>
    );
};

export default DropDowns;