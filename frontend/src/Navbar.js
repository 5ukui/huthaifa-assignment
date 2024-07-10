// src/Navbar.js
import React from 'react';
import logo from './taskerlogo.png';

const Navbar = () => {
    return (
        // Navbar
        <nav className="bg-white flex fixed w-full top-0 z-50 border-2">
        <div className="p-4 flex justify-between w-full">
            
            {/* Brand Logo */}
            <div className=''>
                <a href="/">
                    <img src={logo} alt="navbarbrand" className='w-[100px]' />
                </a>
            </div>

            {/* Menu links */}
            <ul className="flex space-x-5 uppercase my-auto">

            </ul>
        </div>
        </nav>
    );
};

export default Navbar;