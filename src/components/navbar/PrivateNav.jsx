import React from 'react'
import { Link } from 'react-router-dom'
import { selectIsAuthenticated, selectUser } from '../../redux/slices/authSlice';
import { useSelector } from 'react-redux';
import { ROLES } from '../../constants/roles';

const PrivateNav = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  return (
    <div>
      <ul className='flex gap-8 font-bold text-primary'>
        {isAuthenticated && user.role === ROLES.OWNER &&
          (<>
            <Link to="/owner/dashboard" >
              <li>Dashboard</li>
            </Link>
            <Link to="/owner/bookings">
              <li>Booking</li>
            </Link>
            <Link to="/owner/property">
              <li>Property</li>
            </Link>
            <Link to="/owner/profile">
              <li>Profile</li>
            </Link></>)
        }
        {isAuthenticated && user.role === ROLES.CUSTOMER && (<>
          <Link to="/customer/my-bookings">
            <li>Booking</li>
          </Link>

          <Link to="/customer/profile">
            <li>Profile</li>
          </Link></>)
        }
      </ul>
    </div>
  )
}

export default PrivateNav