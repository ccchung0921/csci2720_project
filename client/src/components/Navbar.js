import React,{useMemo} from 'react';
import {Nav,Navbar} from 'react-bootstrap';
import {useSelector,useDispatch} from 'react-redux';
import {RiLogoutBoxLine} from 'react-icons/ri'
import {Link,useLocation} from 'react-router-dom'

const NavbarComponent = () => {
    const authData = useSelector((state)=> state.auth.authData);
    const location = useLocation();
    const dispatch = useDispatch();
    const auth = JSON.parse(localStorage.getItem('auth'));
    const isAuth = authData != null || auth != null;
    const username = useMemo(()=> authData != null ? authData.username : auth != null? auth.username :'',[authData,location]);
    const isAdmin = useMemo(()=> authData != null? authData.isAdmin : auth != null? auth.isAdmin :false,[authData,location]);
    return(
        <Navbar style={{backgroundColor:'rgb(241, 196, 15)'}} collapseOnSelect className="d-flex justify-content-center" expand="lg" sticky='top'>
               <Navbar.Brand style={{color:'white'}}  href="/">Hospital Waiting Time</Navbar.Brand>
               <Navbar.Toggle aria-controls="responsive-navbar-nav" />
               <Navbar.Collapse id="responsive-navbar-nav">
               <Nav className="ml-auto">
                    <Link className="nav-link" as={Link} to="/profile" style={{color:'white'}}>
                        {username}
                    </Link>
                    {isAdmin? <Link  className="nav-link" as={Link} to="/manage" style={{color:'white'}}>
                            Manage
                        </Link>
                    :null}
                    {isAuth &&  <Link className="nav-link" as={Link} onClick={()=> dispatch({type:'LOGOUT'})} to="/login" style={{color:'white'}}><RiLogoutBoxLine size={24} className="logout"  /></Link>}
                </Nav>
               </Navbar.Collapse>
        </Navbar>
    )
}

export default NavbarComponent;