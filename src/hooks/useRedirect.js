import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectUser } from '../redux/slices/authSlice';
import { ROLES } from '../constants/roles';

const useRedirect = () => {
	const navigate = useNavigate();
	const isAuthenticated = useSelector(selectIsAuthenticated);
	const user = useSelector(selectUser);

	useEffect(() => {
		if (isAuthenticated) {
			if (user.role === ROLES.CUSTOMER) {
				navigate('/');
			} else {
				navigate('/owner/dashboard');
			}
		}
	}, [navigate, isAuthenticated, user]);
};

export default useRedirect;
