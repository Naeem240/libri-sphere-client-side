import React from 'react';
import { Slide } from 'react-awesome-reveal';
import CountUp from 'react-countup';

const Service = ({ service }) => {
    return (
        <Slide cascade fraction={1} damping={0.5} duration={800} triggerOnce direction='left'>
        <div className='w-full rounded-xl shadow-lg bg-secondary text-white p-4'>
            <img className='' src={service.image} alt="" />
            <h1 className='text-5xl md:text-6xl font-bold my-4'>
                <CountUp
                    end={service.totalNumber}
                    duration={1}
                    enableScrollSpy={true}
                    scrollSpyOnce={true}
                />+</h1>
            <h2 className='opacity-70 text-lg'>{service.name}</h2>
        </div>
        </Slide>
    );
};

export default Service;