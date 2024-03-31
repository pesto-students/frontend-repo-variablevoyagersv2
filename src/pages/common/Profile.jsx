import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { updateUser } from '../../services/user.service';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setUser } from '../../redux/slices/authSlice';
import AccountForm from '../../components/profile/AccountForm';
import ChangePasswordForm from '../../components/profile/ChangePasswordForm';

const Profile = () => {
	const [view, setView] = useState('account');

	return (
		<>
			<div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
				<aside className="px-2 py-6 sm:px-6 lg:col-span-3 lg:px-0 lg:py-0">
					<nav className="space-y-1 flex  lg:flex-col">
						<a
							onClick={() => setView('account')}
							className={`cursor-pointer text-gray-900 group flex items-center rounded-md px-3 py-2 text-sm font-medium ${
								view === 'account' ? 'bg-gray-50 text-indigo-700' : 'hover:bg-gray-50 hover:text-gray-900'
							}`}
						>
							<span className="truncate">Account</span>
						</a>
						<a
							onClick={() => setView('password')}
							className={`cursor-pointer text-gray-900 group flex items-center rounded-md px-3 py-2 text-sm font-medium ${
								view === 'password' ? 'bg-gray-50 text-indigo-700' : 'hover:bg-gray-50 hover:text-gray-900'
							}`}
						>
							<span className="truncate">Password</span>
						</a>
					</nav>
				</aside>

				<div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
					{view === 'account' && <AccountForm />}
					{view === 'password' && <ChangePasswordForm />}
				</div>
			</div>
		</>
	);
};

export default Profile;
