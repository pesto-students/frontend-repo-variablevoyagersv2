import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { updateUser } from '../../services/user.service';
import { toast } from 'react-toastify';

const MyProfile = () => {
	const navigate = useNavigate();
	const { user, setUser } = useAuth();
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm({});
	const [generalError, setGeneralError] = useState('');
	const phoneRegex = /^[6-9]\d{9}$/;

	useEffect(() => {
		if (user) {
			setValue('firstName', user.firstName);
			setValue('lastName', user.lastName);
			setValue('email', user.email);
			setValue('avatar', user.avatar);
			setValue('phone', user.phone);
		}
	}, [user, setValue]);

	const onSubmit = async (values) => {
		try {
			const formData = new FormData();
			formData.append('firstName', values.firstName);
			formData.append('lastName', values.lastName);
			formData.append('email', values.email);
			formData.append('avatar', values.avatar);
			formData.append('phone', values.phone);
			const updatedUser = await updateUser(user.id, formData);
			localStorage.setItem('user', JSON.stringify(updatedUser));
			setUser(updatedUser);
			setGeneralError('');
			toast.success('Profile updated');
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<div className="mt-20 flex-grow flex justify-center items-center max-h-screen">
			<div className="p-4 border border-gray-400 border-opacity-20 shadow-2xl rounded-xl w-full max-w-md">
				<h1 className="text-4xl text-center mb-4">My Profile</h1>
				<form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
					<div className="flex flex-row gap-2">
						{/* <div className="flex items-center space-x-4">
                            <label htmlFor="avatar">Avatar</label>
                            <div className="flex items-center space-x-2">
                                <img
                                    alt="Your avatar"
                                    className="rounded-full"
                                    height="64"
                                    // src="/placeholder.jpg"

                                    style={{
                                        aspectRatio: "64/64",
                                        objectFit: "cover",
                                    }}
                                    width="64"
                                />
                                <Button size="sm">Upload</Button>
                            </div>
                        </div> */}
						<div>
							<input
								type="text"
								placeholder="First Name"
								{...register('firstName', { required: 'First Name is required' })}
								className="w-full p-2 border rounded"
							/>
							<p className="text-red-500">{errors.firstName?.message}</p>
						</div>

						<div>
							<input
								type="text"
								placeholder="Last Name"
								{...register('lastName', { required: 'Last Name is required' })}
								className="w-full p-2 border rounded"
							/>
							<p className="text-red-500">{errors.lastName?.message}</p>
						</div>
					</div>

					<div>
						<input
							disabled
							type="text"
							placeholder="Your@email.com"
							{...register('email', {
								required: 'Email is required',
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
									message: 'Invalid email address',
								},
							})}
							className="w-full p-2 border rounded text-gray-400"
						/>
						<p className="text-red-500">{errors.email?.message}</p>
					</div>

					<div>
						<input type="text" placeholder="Avatar URL" {...register('avatar')} className="w-full p-2 border rounded" />
						<p className="text-red-500">{errors.avatar?.message}</p>
					</div>

					<div>
						<input
							type="tel"
							placeholder="Phone"
							{...register('phone', {
								required: 'Phone is required',
								pattern: {
									value: phoneRegex,
									message: 'Invalid phone number',
								},
							})}
							className="w-full p-2 border rounded"
						/>
						<p className="text-red-500">{errors.phone?.message}</p>
					</div>

					{generalError && <p className="text-red-500">{generalError}</p>}

					<button className="primary my-3" disabled={isSubmitting} type="submit">
						{isSubmitting ? 'Updating' : 'Update Profile'}
					</button>
				</form>
			</div>
		</div>
	);
};

export default MyProfile;
