import React, { useEffect, useState } from 'react';
import Service from './Service';

const Services = () => {

    const [serviceData, setServiceData] = useState([])

    useEffect(() => {
        fetch('/service.json')
            .then(res => res.json())
            .then(data => {
                setServiceData(data)
            })
    }, [])
    // console.log(serviceData);


    return (
        <div className='text-secondary border-b-2 py-4'>
            <div className='text-center mb-4'>
                <h1 className='text-3xl font-bold mb-2'>LibriSphere Services</h1>
                <p className='text-sm md:text-lg border-b-2 pb-4'>
                    Our platform connects you with verified and best seller books across the world — all at your convenience.
                </p>
            </div>
            <div className='p-4 grid grid-cols-2 lg:grid-cols-4 gap-4'>
                {
                    serviceData.map(service => <Service key={service.id} service={service} />)
                }
            </div>
        </div>
    );
};

export default Services;