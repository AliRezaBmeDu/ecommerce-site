import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {AiOutlineShopping} from 'react-icons/ai';
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';
import SearchInput from '../Form/SearchInput';

const Header = () => {
    const [auth, setAuth] = useAuth();

    const handleLogout = () => {
        setAuth({
            ...auth, user: null, token: ""
        })
        localStorage.removeItem('auth')
        toast.success('Logout successfull')
    }
  return (
    <React.Fragment>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <Link to="/" className="navbar-brand">
                        <AiOutlineShopping/> Ecommerce App
                    </Link>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <SearchInput />
                        <li className="nav-item">
                            <NavLink to="/" className="nav-link active">
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/category" className="nav-link active">
                                category
                            </NavLink>
                        </li>
                        {
                            !auth.user ?  (
                                <React.Fragment>
                                    <li className="nav-item">
                                        <NavLink to="/register" className="nav-link" href="#">
                                            register
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink  to="/login" className="nav-link" href="#">
                                            Login
                                        </NavLink>
                                    </li>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <li className="nav-item dropdown">
                                        <NavLink 
                                            className="nav-link dropdown-toggle" 
                                            href="#" 
                                            role="button" 
                                            data-bs-toggle="dropdown" 
                                            aria-expanded="false"
                                        >
                                            {auth?.user?.name}
                                        </NavLink>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <NavLink className="dropdown-item" to={`/dashboard/${
                                                    auth?.user?.role === 1 ? "admin" : "user"
                                                }`}>
                                                    Dashboard
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink onClick={handleLogout} to="/login" className="dropdown-item" href="#">
                                                    Logout
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </li>
                                    
                                </React.Fragment>
                            )
                        }
                        
                        <li className="nav-item">
                            <NavLink to="/cart" className="nav-link" href="#">
                                Cart (0)
                            </NavLink>
                        </li>
                        
                    </ul>
                </div>  
            </div>
         </nav>
    </React.Fragment>
  )
}

export default Header