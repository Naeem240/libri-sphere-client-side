import React, { useContext, useState } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import Swal from 'sweetalert2';

const API_BASE = import.meta.env.VITE_API_URL || 'https://libri-sphere-server.vercel.app';

const SubscriptionForm = () => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value.trim();
        const email = form.email.value.trim();

        if (!name || !email) return;

        setLoading(true);
        try {
            const res = await fetch(`${API_BASE}/subscriptions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email })
            });

            const data = await res.json();

            if (res.ok && data.success) {
                Swal.fire({
                    toast: true,
                    icon: 'success',
                    title: 'Subscribed successfully!',
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true
                });
                form.reset();
            } else if (res.status === 409) {
                Swal.fire({
                    toast: true,
                    icon: 'info',
                    title: 'You are already subscribed!',
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true
                });
            } else {
                throw new Error(data.message || 'Subscription failed');
            }
        } catch (err) {
            console.error(err);
            Swal.fire({
                toast: true,
                icon: 'error',
                title: 'Something went wrong',
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="-mt-35">
            <form
                onSubmit={handleSubmit}
                className="bg-secondary relative top-40 shadow-lg fieldset border-secondary rounded-box border px-6 pb-6 m-4 md:mx-40 lg:mx-80"
            >
                <legend className="text-3xl fieldset-legend underline block text-center text-white">
                    Notify Me on New Arrival:
                </legend>

                <label className="label text-white">Name</label>
                <input
                    defaultValue={user?.displayName || ''}
                    name="name"
                    required
                    type="text"
                    className="input w-full border border-secondary"
                    placeholder="Name"
                />
                <label className="label text-white">Email</label>
                <input
                    defaultValue={user?.email || ''}
                    name="email"
                    required
                    type="email"
                    className="input w-full border border-secondary"
                    placeholder="Email"
                />

                <input
                    disabled={loading}
                    type="submit"
                    className="btn font-bold border-2 mt-4"
                    value={loading ? 'Subscribing...' : 'Subscribe'}
                />
            </form>
        </div>
    );
};

export default SubscriptionForm;
