import React,{useMemo} from 'react';
import {Redirect, Route} from 'react-router-dom';


const AdminRoute = ({comp: Component,...rest}) =>{
    const auth = JSON.parse(localStorage.getItem('auth'));
    const isAdmin = useMemo(()=> auth != null && auth?.isAdmin);
    return(
        <Route
        {...rest}
        render = {props=>
        isAdmin ? (
            <Component {...props} />
        ): <Redirect to='/' />} />
    )
}

export default AdminRoute;
