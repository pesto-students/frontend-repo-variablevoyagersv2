import React, { useState } from 'react';
import AccountForm from '../../components/profile/AccountForm';

const Profile = () => {
	const [view, setView] = useState('account');

	return (
		<>
			<div className="md:flex md:items-center md:justify-between mb-8">
				<div className="min-w-0 flex-1">
					<h2 className="text-2xl font-bold leading-7 text-gray-50 sm:truncate sm:text-3xl sm:tracking-tight">Profile Settings</h2>
					<p className="mt-1 text-sm text-gray-50">Keep your profile up to date </p>
				</div>
			</div>
			<div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
				<aside className="px-2 py-6 sm:px-6 lg:col-span-3 lg:px-0 lg:py-0">
					<nav className="flex gap-2  lg:flex-col">
						<a
							onClick={() => setView('account')}
							className={`cursor-pointer group flex items-center rounded-md px-3 py-2 text-sm font-medium  ${
								view === 'account' ? 'bg-gray-50 text-gray-900' : 'hover:bg-gray-50 hover:text-gray-900 text-gray-50'
							}`}
						>
							<span className="truncate">Account</span>
						</a>
					</nav>
				</aside>

				<div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">{view === 'account' && <AccountForm />}</div>
			</div>
		</>
	);
};

export default Profile;
