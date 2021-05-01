import React,{useMemo, Component} from 'react';
import {Redirect, Route} from 'react-router-dom';
import {useSelector} from 'react-redux'

const PrivateRoute = ({comp: Component,...rest}) =>{
    const authData = useSelector((state)=> state.auth.authData);
    const isAuth = useMemo(()=> authData != null || localStorage.getItem('auth') != null,[authData,window.location])
    return(
        <Route
        {...rest}
        render = {props=>
        isAuth ? (
            <Component {...props} />
        ): <Redirect to='/login' />} />
    )
}

export default PrivateRoute;
