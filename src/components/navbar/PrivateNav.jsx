import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectUser } from '../../redux/slices/authSlice';
import { ROLES } from '../../constants/roles';
import NavList from './List';
import MenuItem from './List';

const PrivateNav = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const closeMenu = () => {
      setIsMenuOpen(false);
    };

    if (isMenuOpen) {
      document.body.addEventListener('click', closeMenu);
    }

    return () => {
      document.body.removeEventListener('click', closeMenu);
    };
  }, [isMenuOpen]);

  const toggleMenu = (event) => {
    event.stopPropagation(); // Prevents event bubbling to body
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClick = (event) => {
    event.stopPropagation(); // Prevents event bubbling to body
  };

  return (
    <div>
      <div className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white lg:hidden md:hidden">
        <button type="button" onClick={toggleMenu}>
          <svg className={`h-6 w-6 ${isMenuOpen ? 'hidden' : 'block'}`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <svg className={`h-6 w-6 ${isMenuOpen ? 'block' : 'hidden'}`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      {isMenuOpen && (
        <div className="absolute border h-screen bg-white mt-3 left-[-2%] w-40" onClick={handleMenuClick}>
          {isAuthenticated && user.role === ROLES.OWNER &&
            <>
              <MenuItem to="/owner/dashboard" onClick={toggleMenu}>Dashboard</MenuItem>
              <MenuItem to="/owner/bookings" onClick={toggleMenu}>Booking</MenuItem>
              <MenuItem to="/owner/property" onClick={toggleMenu}>Property</MenuItem>
              <MenuItem to="/owner/profile" onClick={toggleMenu}>Profile</MenuItem>
            </>
          }
          {isAuthenticated && user.role === ROLES.CUSTOMER &&
            <>
              <MenuItem to="/customer/my-bookings">My Booking</MenuItem>
              <MenuItem to="/customer/profile">Profile</MenuItem>
            </>
          }
        </div>
      )}
      <div className="hidden md:ml-6 md md:block">
        <div  className="flex space-x-4">
          {isAuthenticated && user.role === ROLES.OWNER &&
            <>
              <MenuItem to="/owner/dashboard" >Dashboard</MenuItem>
              <MenuItem to="/owner/bookings" >Booking</MenuItem>
              <MenuItem to="/owner/property" >Property</MenuItem>
              <MenuItem to="/owner/profile" >Profile</MenuItem>
            </>
          }
          {isAuthenticated && user.role === ROLES.CUSTOMER &&
            <>
               <MenuItem to="/customer/my-bookings">My Booking</MenuItem>
              <MenuItem to="/customer/profile">Profile</MenuItem>
            </>
          }
        </div>
      </div>
    </div>
  );
};

export default PrivateNav;
