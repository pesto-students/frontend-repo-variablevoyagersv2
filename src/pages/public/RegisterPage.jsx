import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { axiosInstance } from '../../services/axios.service';
import useRedirect from '../../hooks/useRedirect';
import { setUser } from '../../redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import { ROLES } from '../../constants/roles';

export default function RegisterPage() {
	useRedirect();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		defaultValues: {
			role: 'CUSTOMER',
		},
	});
	const [generalError, setGeneralError] = useState('');

	const registerUser = async (userData) => {
		console.log(userData);
		setGeneralError('');
		try {
			const { data } = await axiosInstance.post('/auth', userData);
			console.log(data);
			if (data.status >= 400 && data.status < 500) setGeneralError(data.message);
			else {
				localStorage.setItem('token', JSON.stringify(data.data.accessToken));
				localStorage.setItem('role', JSON.stringify(data.data.role));
				dispatch(setUser(data.data));
				if (data.data.role === ROLES.OWNER) {
					navigate('/owner/dashboard');
				} else {
					navigate('/');
				}
			}
		} catch (error) {
			if (error.response && error.response.status >= 400 && error.response.status < 500) {
				setGeneralError(error.response.data.message);
			} else {
				setGeneralError(error);
			}
		}
	};
	return (
		<div className="flex-grow flex justify-center items-center max-h-screen mt-32">
			<div className="flex items-center justify-around">
				<div className="border p-4 rounded-xl border-gray-400 border-opacity-20 shadow-2xl">
					<h1 className="text-4xl text-center mb-4">Register</h1>
					<form className="max-w-md mx-auto" onSubmit={handleSubmit(registerUser)}>
						<ul className="flex">
							<li className="w-full ">
								<div className="flex items-center ps-3">
									<input
										id="customer"
										value="CUSTOMER"
										type="radio"
										{...register('role')}
										className="w-4 h-4 text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700"
									/>
									<label htmlFor="customer" className="w-full py-3 ms-2 text-primary ">
										Customer{' '}
									</label>
								</div>
							</li>
							<li className="w-full">
								<div className="flex items-center ps-3">
									<input
										id="owner"
										type="radio"
										value="OWNER"
										{...register('role')}
										className="w-4 h-4 text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700"
									/>
									<label htmlFor="owner" className="w-full py-3 ms-2 text-primary ">
										Owner
									</label>
								</div>
							</li>
						</ul>
						<div className="flex items-center justify-between gap-[4px]">
							<div>
								<input
									type="text"
									placeholder="First name"
									{...register('firstName', {
										required: 'FirstName is required',
									})}
								/>
								<p className="text-red-500">{errors.firstName?.message}</p>
							</div>
							<div>
								<input
									type="text"
									placeholder="Last name"
									{...register('lastName', {
										required: 'LastName is required',
									})}
								/>
								<p className="text-red-500">{errors.lastName?.message}</p>
							</div>
						</div>
						<div className="flex justify-between"></div>
						<input
							type="email"
							placeholder="Your@email.com"
							{...register('email', {
								required: 'Email is required',
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
									message: 'Invalid email address',
								},
							})}
						/>
						<p className="text-red-500">{errors.email?.message}</p>
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
						/>
						<p className="text-red-500">{errors.password?.message}</p>
						{generalError && <p className="text-red-500">{generalError}</p>}
						<button className="primary my-3" disabled={isSubmitting} type="submit">
							{isSubmitting ? 'Loading' : 'Register'}
						</button>
						<div className="text-center py-2 text-gray-500">
							Already a member?{' '}
							<Link className="underline text-black" to={'/login'}>
								Login
							</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
