import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const MenuItem = ({ to, onClick, children }) => {
    const { pathname } = useLocation();
    const isActive = pathname === to;

    return (
        <Link
            to={to}
            onClick={onClick}
            className={`block px-4 py-2 ${isActive ? 'bg-primary text-white sm:rounded-md' : 'text-primary hover:bg-gray-200 sm:rounded-md'}`}
        >
            {children}
        </Link>
    );
};

export default MenuItem;
