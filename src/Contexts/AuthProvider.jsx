import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateEmail, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase.config';


const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    

    // Sign Up
    const signUp = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // Update User
    const updateUser = (updatedUser) => {
        // setLoading(true);
        return updateProfile(auth.currentUser, updatedUser)
    }

    // Update Email
    const updateUserEmail = email => {
        setLoading(true);
        return updateEmail(auth.currentUser, email)
    }

    // Sign Out
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    // Sign In
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    // Login with Google
    const googleLogin = () =>{
        return signInWithPopup(auth, provider);
    }

    // Observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unsubscribe();
        }
    }, [])

    const authData = {
        signUp,
        user,
        setUser,
        loading,
        setLoading,
        logOut,
        signIn,
        updateUser,
        updateUserEmail,
        googleLogin
    }
    return (
        <AuthContext value={authData}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;