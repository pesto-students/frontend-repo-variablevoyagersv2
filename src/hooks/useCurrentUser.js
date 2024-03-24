import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { axiosPrivate } from '../services/axios.service';
import { selectIsAuthenticated, setUser } from '../redux/slices/authSlice';

const useCurrentUser = () => {
	const dispatch = useDispatch();
	const isAuthenticated = useSelector(selectIsAuthenticated);

	useEffect(() => {
		const getCurrentUser = async () => {
			try {
				const { data } = await axiosPrivate.get('/user/current-user');
				console.log('data', data);
				dispatch(setUser(data.data));
			} catch (error) {
				console.log(error);
			}
		};
		const token = JSON.parse(localStorage.getItem('token'));
		console.log(token);
		if (token) {
			getCurrentUser();
		}
	}, [dispatch, isAuthenticated]);

	return null;
};

export default useCurrentUser;
