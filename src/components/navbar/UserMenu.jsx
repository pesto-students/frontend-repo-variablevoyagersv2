import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, selectIsAuthenticated, selectUser } from '../../redux/slices/authSlice';
import { axiosPrivate } from '../../services/axios.service';


export default function UserMenu() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const user = useSelector(selectUser);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const buttonRef = useRef(null);

    const handleLogout = async () => {
        try {
            const { data } = await axiosPrivate.post('/auth/logout', {});
            console.log(data);
            dispatch(clearUser());
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    };

    const getInitials = (user) => {
        const firstInitial = user.firstName.charAt(0).toUpperCase();
        const lastInitial = user.lastName.charAt(0).toUpperCase();
        return `${firstInitial}${lastInitial}`;
    };

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
        <div ref={buttonRef} className="relative ml-3">
            {isAuthenticated && user ? (
                <>
                    <button type="button" onClick={toggleMenu} className="relative flex rounded-full border bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                        <span className="absolute -inset-1.5"></span>
                        {user.avatar ? (
                            <img src={user.avatar} alt="Profile photo" className="inline-block h-10 w-10 rounded-full shadow-lg object-cover" />
                        ) : (
                            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-gray-200 font-semibold uppercase text-gray-700">
                                {getInitials(user)}
                            </div>
                        )}
                    </button>
                    <div className={`absolute right-0 z-10 mt-1 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${isMenuOpen ? '' : 'hidden'}`} aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1" onClick={handleMenuClick}>
                        <div className="mx-2 px-2 py-2 flex flex-col items-start">
                            <div>
                                <p className="text-md font-semibold capitalize">
                                    {user.firstName} {user.lastName}
                                </p>
                                <p className="text-sm flex flex-col items-start capitalize text-base-secondary-text">{user?.role.toLowerCase()}</p>
                            </div>
                        </div>
                        <div className="w-full border h-[1px]"></div>
                        <button
                            onClick={handleLogout}
                            className="text-md text-center my-1 w-full rounded-sm py-1 bg-white hover:bg-gray-200"
                        >
                            Log Out
                        </button>
                    </div>
                </>
            ) : (
                <div className="flex flex-row items-center gap-3 overflow-hidden">
                    <Link
                        to="/register"
                        className="hover:shadow-md   text-primary border border-gray-500 rounded-full px-3 py-2 hover:text-white hover:bg-primary"
                    >
                        Sign-up
                    </Link>
                    <Link to="/login" className="hover:shadow-md text-primary border border-gray-500 rounded-full px-3 py-2 hover:text-white hover:bg-primary">
                        Log-In
                    </Link>
                </div>
            )}
        </div>
    );
}
