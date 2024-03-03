import { Link } from 'react-router-dom';
import { useState } from 'react';
// import axios from 'axios';

export default function RegisterPage() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
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
				body: JSON.stringify({ firstName, lastName, email, password, role: 'OWNER' }),
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
			<div className="mb-64">
				<h1 className="text-4xl text-center mb-4">Register</h1>
				<form className="max-w-md mx-auto" onSubmit={registerUser}>
					<div className="flex items-centr justify-between gap-[4px]">
						<input type="text" placeholder="First name" value={firstName} onChange={(ev) => setFirstName(ev.target.value)} />
						<input type="text" placeholder="Last name" value={lastName} onChange={(ev) => setLastName(ev.target.value)} />
					</div>
					<input type="email" placeholder="your@email.com" value={email} onChange={(ev) => setEmail(ev.target.value)} />
					<input type="password" placeholder="Password" value={password} onChange={(ev) => setPassword(ev.target.value)} />
					<button className="primary" disabled={loading}>
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
