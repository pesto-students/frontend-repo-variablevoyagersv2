import { Link } from 'react-router-dom';
import { useState } from 'react';
// import axios from 'axios';

export default function RegisterPage() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [role, setRole] = useState('');
	const [loading, setLoading] = useState(false);
	
	async function registerUser(ev) {
		ev.preventDefault();
		setLoading(true);
		try {
			const res = await fetch(`http://localhost:5050/api/v1/auth`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ firstName, lastName, email, password, role }),
			});
			const data = await res.json();
			console.log(data);
			setLoading(false);
			alert('Registration successful. Now you can log in');
		} catch (e) {
			setLoading(false);
			alert('Registration failed. Please try again later');
		}
	}
	return (
		<div className="mt-4 grow flex items-center justify-around">
			<div className="mb-16 border p-4 rounded-xl border-gray-400 border-opacity-20 shadow-2xl">
				<h1 className="text-4xl text-center mb-4">Register</h1>
				<form className="max-w-md mx-auto" onSubmit={registerUser}>
					<ul className='flex'>
						<li className="w-full ">
							<div className="flex items-center ps-3">
								<input id="horizontal-list-radio-license" type="radio"  value="CUSTOMER" onChange={(ev) => setRole(ev.target.value)} name="list-radio" className="w-4 h-4 text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700"/>
									<label for="horizontal-list-radio-license" className="w-full py-3 ms-2 text-primary ">Customer </label>
							</div>
						</li>
						<li className="w-full">
							<div className="flex items-center ps-3">
								<input id="horizontal-list-radio-id" type="radio" value="OWNER" onChange={(ev) => setRole(ev.target.value)} name="list-radio" className="w-4 h-4 text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700"/>
									<label for="horizontal-list-radio-id" className="w-full py-3 ms-2 text-primary ">Owner</label>
							</div>
						</li>
					</ul>
					<div className="flex items-center justify-between gap-[4px]">
						<input type="text" placeholder="First name" value={firstName} onChange={(ev) => setFirstName(ev.target.value)} />
						<input type="text" placeholder="Last name" value={lastName} onChange={(ev) => setLastName(ev.target.value)} />
					</div>
					<input type="email" placeholder="Your@email.com" value={email} onChange={(ev) => setEmail(ev.target.value)} />
					<input type="password" placeholder="Password" value={password} onChange={(ev) => setPassword(ev.target.value)} />
					<button className="primary my-3"  disabled={loading}>
						Register
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
	);
}
