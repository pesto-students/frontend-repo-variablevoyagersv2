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
		const { accessToken } = JSON.parse(localStorage.getItem('user'));

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
		const originalRequest = error.config;
		if (error.response.status === 403 && !originalRequest._retry) {
			originalRequest._retry = true;
			try {
				const response = await axiosInstance.post('/auth/refreshToken', {
					crossDomain: true,
					withCredentials: true,
				});
				const user = JSON.parse(localStorage.getItem('user'));
				localStorage.setItem('user', JSON.stringify({ ...user, accessToken: response.data.accessToken }));
				return axiosPrivate(originalRequest);
			} catch (error) {
				console.log(error);
			}
		}
		return Promise.reject(error);
	},
);
