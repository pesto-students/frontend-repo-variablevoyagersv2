import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const axiosInstance = axios.create({
	baseURL: API_URL,
	withCredentials: true,
});

export const axiosPrivate = axios.create({
	baseURL: API_URL,
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true,
});

// Request interceptor for adding access token to headers
axiosPrivate.interceptors.request.use(
	(config) => {
		const accessToken = localStorage.getItem('token');
		if (accessToken) {
			config.headers['Authorization'] = `Bearer ${accessToken}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

// Response interceptor for handling token expiration
axiosPrivate.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		if (error.response && error.response.status === 401) {
			if (error.config.url.includes('/auth/refreshToken')) {
				window.location.href = '/session-expired';
				return;
			}
			try {
				const { data } = await axiosInstance.post('/auth/refreshToken', {
					crossDomain: true,
					withCredentials: true,
				});
				error.config.headers['Authorization'] = `Bearer ${data.data}`;

				localStorage.setItem('token', data.data);
				return axiosPrivate(error.config);
			} catch (error) {
				console.log(error);
				throw error;
			}
		}

		return Promise.reject(error);
	},
);
