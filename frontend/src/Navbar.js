import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from './taskerlogo.png';
import { AuthContext } from './context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    
    // Dropdown menu states
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-white flex fixed w-full top-0 z-50 border-2">
        <div className="p-4 flex justify-between w-full">
            
            {/* Brand Logo */}
            <div className="flex items-center">
                <Link to="/">
                    <img src={logo} alt="navbarbrand" className="w-[100px]" />
                </Link>
                <h1 className="text-[32px]">📋</h1>
            </div>

            {/* Menu links */}
            <ul className="flex space-x-5 uppercase my-auto">
                {user ? (
                    <>
                    
                    <div className="relative">
                        <button
                            className="flex items-center justify-center px-4 py-2 text-md font-medium text-black hover:text-gray-900 focus:outline-none focus:text-gray-900 uppercase"
                            onClick={toggleDropdown}
                        >
                            {user}
                        </button>
                        <div className={`absolute right-0 z-10 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg w-48 ${isOpen ? 'fadeIn' : 'fadeOut'}`}>
                            <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-center">
                                <Link to="/profile" className="hover:text-gray-700">
                                    Profile
                                </Link>
                            </div>
                            <div className="px-4 py-2 text-sm text-red-700 hover:bg-gray-100 text-center">
                                <button onClick={logout} className="uppercase">
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                    
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
