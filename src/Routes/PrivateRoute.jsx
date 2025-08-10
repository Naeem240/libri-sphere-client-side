import React, { use } from 'react';
import { Navigate, useLocation } from 'react-router';
import Loading from '../Components/Loading';
import { AuthContext } from '../Contexts/AuthContext';

const PrivateRoute = ({ children }) => {
    const { user, loading } = use(AuthContext);
    const location = useLocation()
    // console.log(location)

    if (loading) {
        return <Loading />
    }
    if (user?.email) {
        return children
    }
    return <Navigate state={location.pathname} to='/login'></Navigate>
};

export default PrivateRoute;