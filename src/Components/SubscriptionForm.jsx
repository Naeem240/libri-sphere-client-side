import React, { use } from 'react';
import { AuthContext } from '../Contexts/AuthContext';

const SubscriptionForm = () => {
    const {user} = use(AuthContext)
    return (
        <div className='-mt-35'>
            <form className="bg-secondary relative top-40 shadow-lg fieldset border-secondary rounded-box border px-6 pb-6 m-4 md:mx-40 lg:mx-80 ">
                <legend className="text-3xl fieldset-legend underline block text-center text-white">Notify Me on New Arrival:</legend>

                <label className="label text-white">Name</label>
                <input defaultValue={user?.displayName} name='name' required type="text" className="input w-full border border-secondary" placeholder="Name" />
                <label className="label text-white">Email</label>
                <input defaultValue={user?.email} name='email' required type="email" className="input w-full border border-secondary" placeholder="Email" />

                <input type='submit' className="btn font-bold border-2 mt-4" value='Subscribe' />
            </form>
        </div>
    );
};

export default SubscriptionForm;