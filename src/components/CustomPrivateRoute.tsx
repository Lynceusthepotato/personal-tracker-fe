import React, { useEffect } from 'react'
import { useIsAuthenticated } from 'react-auth-kit';
import { Navigate } from 'react-router-dom';

type customPrivateRouteProps = {
    children?: React.ReactNode;
}

export default function CustomPrivateRoute({children} : customPrivateRouteProps) {
    const isAuthenticated = useIsAuthenticated();

    useEffect(() => {
        if (!isAuthenticated()) {
            alert("You need to login first"); // commented since useEffect called twice in strict mode sometimes
        }
    }, []);

    return isAuthenticated() ? <>{children}</> : <Navigate to='/'/>;
}