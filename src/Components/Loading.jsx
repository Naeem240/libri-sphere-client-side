import React from 'react';

const Loading = () => {
    return (
        <div className='h-[80vh] w-full flex justify-center items-center'>
            <span className="loading loading-dots loading-xl text-secondary"></span>
        </div>
    );
};

export default Loading;