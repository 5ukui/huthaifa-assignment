import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from './taskerlogo.png';
import { AuthContext } from './context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    return (
        <nav className="bg-white flex fixed w-full top-0 z-50 border-2">
        <div className="p-4 flex justify-between w-full">

            {/* Brand Logo */}
            <div>
            <Link to="/">
                <img src={logo} alt="navbarbrand" className="w-[100px]" />
            </Link>
            </div>

            {/* Menu links */}
            <ul className="flex space-x-5 uppercase my-auto">
                {user ? (
                    <>
                    <li>
                        <Link to="/profile" className="hover:text-gray-700">
                            {user}
                        </Link>
                    </li>
                    <li>
                        <button onClick={logout} className="hover:text-gray-700">
                            LOGOUT
                        </button>
                    </li>
                    </>
                ) : (
                    <>
                    <li>
                        <Link to="/login" className="hover:text-gray-700">
                            Login
                        </Link>
                    </li>
                    <li>
                        <Link to="/signup" className="hover:text-gray-700">
                            Signup
                        </Link>
                    </li>
                    </>
                )}
            </ul>
        </div>
        </nav>
    );
};

export default Navbar;
