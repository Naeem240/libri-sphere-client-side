import React, { use, useEffect, useState } from 'react';
import { BsEye, BsEyeFill } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { Link, Navigate, useNavigate } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';
import Swal from 'sweetalert2';
import Loading from '../Components/Loading';
import { Helmet } from 'react-helmet';

const Register = () => {
    // Jump to Top
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    // Data From Auth
    const { signUp, user, setUser, updateUser, loading, googleLogin } = use(AuthContext)

    // // console.log(user)


    const [showPass, setShowPass] = useState(false);
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()
    // // console.log(errMsg);

    const handleSignUp = (e) => {
        e.preventDefault()
        const form = e.target
        const formData = new FormData(form);
        const newUser = Object.fromEntries(formData.entries());
        const { password, ...userProfile } = newUser;
        const { email, name, photo, phone, address } = userProfile;

        // console.log(phone);


        // Password Validate
        const passRegExp = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
        if (passRegExp.test(password) === false) {
            setErrMsg('● Must have an Uppercase letter in the password, ● Must have a Lowercase letter in the password, ● Length must be at least 6 character');
            return;
        }
        signUp(email, password)
            .then(res => {
                // // console.log(res.user)
                userProfile.creationTime = res.user?.metadata?.creationTime;
                userProfile.lastSignInTime = res.user?.metadata?.lastSignInTime;

                const user = res.user

                updateUser({
                    displayName: name,
                    photoURL: photo,
                    phoneNumber: phone,
                    address: address,
                })
                    .then(() => {
                        setUser({
                            ...user,
                            displayName: name,
                            photoURL: photo,
                            phoneNumber: phone,
                            address: address,
                        })
                        // console.log(user);
                    })
                    .catch((err) => {
                        const errCode = err.code;
                        const errMsg = err.message
                        Swal.fire({
                            title: `${errCode}`,
                            text: `${errMsg}`,
                            icon: 'error',
                            confirmButtonText: 'Okay'
                        })
                        setUser(user);
                    })


                // //Send to DB
                // fetch('https://b11a10-server-side-naeem240.vercel.app/users', {
                //     method: 'POST',
                //     headers: {
                //         'content-type': 'application/json'
                //     },
                //     body: JSON.stringify(userProfile)
                // })
                //     .then(res => res.json())
                //     .then(data => {
                //         if (data.insertedId) {
                //             Swal.fire({
                //                 position: "top-end",
                //                 icon: "success",
                //                 title: "Account Created Successfully",
                //                 showConfirmButton: false,
                //                 timer: 1500
                //             });
                //         }
                //     })

            })
            .catch((error) => {
                const errorCode = error.code;
                // const errorMessage = error.message;
                // console.log(errorCode, errorMessage);
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: `${errorCode}`,
                    showConfirmButton: false,
                    timer: 1500
                });
                // ..
            });
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
                    title: `${err.code}`,
                    text: `${err.message}`,
                    icon: 'error',
                    confirmButtonText: 'Login Again'
                })
                navigate('/login')
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
            <div className='min-h-120 flex items-center my-4 mx-4 md:mx-0'>
                <Helmet>
                    <title>LibriSphere || Register</title>
                </Helmet>
                <form onSubmit={handleSignUp} className="fieldset bg-secondary border-secondary rounded-box w-md border p-4 mx-auto">
                    <legend className="text-3xl text-gray-300 fieldset-legend flex justify-center">Sign Up</legend>

                    <label className="label">Name</label>
                    <input name='name' type="text" className="input w-full" placeholder="Your Name" />
                    <label className="label">Phone</label>
                    <input name='phone' type="text" className="input w-full" placeholder="Your Phone (Optional)" />
                    <label className="label">Address</label>
                    <input required name='address' type="text" className="input w-full" placeholder="Your Address (Optional)" />
                    <label className="label">Email</label>
                    <input required name='email' type="email" className="input w-full" placeholder="Email" />
                    <label className="label">Photo URL</label>
                    <input required name='photo' type="text" className="input w-full" placeholder="Your Photo URL" />
                    <label className="label">Password</label>
                    <div className=' relative flex items-center'>
                        <input name='password' type={showPass ? 'text' : 'password'} className="input w-full" placeholder="Password"
                        />
                        {
                            showPass ? <BsEyeFill onClick={() => { setShowPass(!showPass) }} className='absolute z-50 right-4 w-4 h-4 text-black cursor-pointer' />
                                : <BsEye onClick={() => { setShowPass(!showPass) }} className='absolute z-50 right-4 w-4 h-4 text-black cursor-pointer' />

                        }

                    </div>

                    <input required type='submit' className="btn btn-success btn-outline mt-4 hover:text-gray-300" value='Sign Up' />

                    <button onClick={handleGoogleLogin} type='button' className='btn btn-success btn-outline hover:text-gray-300'>
                        <span><FcGoogle /></span>
                        <span>Login with Google
                        </span>
                    </button>
                    <p className='text-sm text-white'>
                        Already Have an Account? <Link to='/login' className='underline font-bold text-success'>Login</Link>
                    </p>
                    <p className='text-red-700'>
                        {errMsg}
                    </p>
                </form>

            </div>
        );
    }
};

export default Register;