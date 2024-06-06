import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link, useLocation, useSearchParams } from 'react-router-dom';
import { axiosInstance } from '../../services/axios.service';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/authSlice';
import useRedirect from '../../hooks/useRedirect';
import { ROLES } from '../../constants/roles';

const LoginPage = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [searchParams] = useSearchParams();
	const id = searchParams.get('id');
	// useRedirect(id);
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm();
	const [generalError, setGeneralError] = useState('');
	const dispatch = useDispatch();

	const redirectUrl = new URLSearchParams(location.search).get('redirect');
	console.log(redirectUrl);

	const onSubmit = async (values) => {
		try {
			const { data } = await axiosInstance.post('/auth/login', values);
			localStorage.setItem('token', JSON.stringify(data.data.accessToken));
			localStorage.setItem('role', JSON.stringify(data.data.role));
			dispatch(setUser(data.data));

			if (data.data.role === ROLES.OWNER) {
				navigate('/owner/dashboard');
			} else {
				navigate(id ? `/property-detail/${id}` : '/');
			}
		} catch (error) {
			if (error.response && error.response.status === 401) {
				setGeneralError(error.response.data.message);
			} else {
				setGeneralError('Login failed');
			}
		}
	};

	return (
		<div className="flex-grow flex justify-center items-center max-h-screen mb-20 mt-32">
			<div className="p-4 border border-gray-400 border-opacity-20 shadow-2xl rounded-xl w-full max-w-md">
				<h1 className="text-4xl text-center mb-4">Login</h1>
				<form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
					<div>
						<input
							id="username"
							type="text"
							placeholder="Your@email.com"
							{...register('email', {
								required: 'Email is required',
								pattern: {
									value: /^\S+@\S+\.\S+$/i,
									message: 'Invalid email address',
								},
							})}
							className="w-full p-2 border rounded"
						/>
						<p className="text-red-500">{errors.email?.message}</p>
					</div>
					<div>
						<input
							type="password"
							placeholder="Password"
							{...register('password', {
								required: 'Password is required',
								minLength: {
									value: 6,
									message: 'Password must be at least 6 characters',
								},
							})}
							className="w-full p-2 border rounded"
						/>
						<p className="text-red-500">{errors.password?.message}</p>
					</div>
					{generalError && <p className="text-red-500">{generalError}</p>}
					<button className="primary my-3" disabled={isSubmitting} type="submit">
						{isSubmitting ? 'Loading' : 'Log-In'}
					</button>
					<div className="text-center py-2 text-gray-500">
						Don't have an account yet?{' '}
						<Link className="underline text-blue-500" to={'/register'}>
							Register now
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
