import React, { use, useEffect, useState } from 'react';
import { BsEye, BsEyeFill } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { Link, Navigate, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';
import Swal from 'sweetalert2';
import Loading from '../Components/Loading';
import { Helmet } from 'react-helmet';

const Login = () => {

    // Jump to Top
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const [showPass, setShowPass] = useState(false);
    const { signIn, setUser, user, loading, googleLogin, setLoading } = use(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    // Handle Login Form Submit
    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(res => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: 'Login Successful',
                    showConfirmButton: false,
                    timer: 1500
                });
                setUser(res.user);
                navigate(`${location.state ? location.state : '/'}`)
            })
            .catch(err => {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: `${err}`,
                    showConfirmButton: false,
                    timer: 1500
                });
                setLoading(false);
                navigate('/login')
            })
        form.reset()
    }

    // Handle Google Log in
    const handleGoogleLogin = () => {
        googleLogin()
            .then((res) => {
                const user = res.user
                setUser(user);
                Swal.fire({
                    title: 'Success!',
                    text: 'Login Successful!!',
                    icon: 'success',
                    confirmButtonText: 'Okay'
                })
                navigate(`${location.state ? location.state : '/'}`)
            })
            .catch((err) => {
                Swal.fire({
                    title: `Sorry!`,
                    text: `${err.message}`,
                    icon: 'error',
                    confirmButtonText: 'Login Again'
                })
                navigate('/profile/login')
            })
    }

    if (!loading && user?.email) {
        return <Navigate to={`${location.state ? location.state : '/'}`}></Navigate>

    }
    else if (loading) {
        return <>
            <Loading />
        </>
    }

    else if (!loading && !user?.email) {

        return (
            <div className='min-h-120 flex items-center'>
                <Helmet>
                    <title>LibriSphere || Login</title>
                </Helmet>
                <form onSubmit={handleLogin} className="fieldset bg-secondary border-secondary rounded-box w-xs border p-4 mx-auto">
                    <legend className="text-3xl fieldset-legend text-gray-300">Login</legend>

                    <label className="label text-gray-300">Email</label>
                    <input required name='email' type="email" className="input" placeholder="Email" />

                    <label className="label text-gray-300">Password</label>
                    <div className=' relative flex items-center'>
                        <input required name='password' type={showPass ? 'text' : 'password'} className="input" placeholder="Password" />
                        {
                            showPass ? <BsEyeFill onClick={() => { setShowPass(!showPass) }} className='absolute z-50 right-4 w-4 h-4 text-black cursor-pointer' />
                                : <BsEye onClick={() => { setShowPass(!showPass) }} className='absolute z-50 right-4 w-4 h-4 text-black cursor-pointer' />

                        }
                    </div>

                    <input type='submit' className="btn btn-success btn-outline mt-4 hover:text-gray-300" value='Login' />
                    <button onClick={handleGoogleLogin} type='button' className='flex items-center gap-2 btn btn-success hover:text-gray-300 btn-outline'>
                        <span><FcGoogle /></span>
                        <span>Login with Google
                        </span>
                    </button>
                    <p className='text-sm text-gray-400'>
                        Don't Have an Account? <Link to='/register' className='underline font-bold text-gray-300'>Register</Link>
                    </p>
                    <Link className='underline text-sm text-gray-300'>Forget Password?</Link>

                </form>
            </div>
        );
    }
};

export default Login;