import React,{useMemo} from 'react';
import {Navbar} from 'react-bootstrap';
import {useSelector,useDispatch} from 'react-redux';
import {RiLogoutBoxLine} from 'react-icons/ri'


const NavbarComponent = () => {
    const authData = useSelector((state)=> state.auth.authData);
    const dispatch = useDispatch();
    const auth = JSON.parse(localStorage.getItem('auth'));
    const isAuth = authData != null || auth != null;
    const username = useMemo(()=> authData != null ? authData.username : auth != null? auth.username :'',[authData]);
    return(
        <Navbar style={{backgroundColor:'rgb(241, 196, 15)'}} collapseOnSelect className="d-flex justify-content-center" expand="lg" sticky='top'>
               <Navbar.Collapse className="justify-content-start">
                <Navbar.Text style={{color:'white'}}>
                 {isAuth && <RiLogoutBoxLine size={24} className="logout" onClick={()=> dispatch({type:'LOGOUT'})} />}
                </Navbar.Text>
               </Navbar.Collapse>
               <Navbar.Brand className="d-flex ml-auto mr-auto" style={{color:'white'}}  href="/">Hospital Waiting Time</Navbar.Brand>
               <Navbar.Collapse className="justify-content-end">
                <Navbar.Text style={{color:'white'}}>
                    {username}
                </Navbar.Text>
               </Navbar.Collapse>
        </Navbar>
    )
}

export default NavbarComponent;