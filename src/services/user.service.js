import { ROLES } from '../constants/roles';
import { axiosInstance, axiosPrivate } from './axios.service';
import { useNavigate } from 'react-router-dom';

// const navigate = useNavigate();

export async function updateUser(userId, formData) {
	try {
		const { data } = await axiosPrivate.put(`/user/${userId}`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		console.log('Data', data);
		return data.data;
	} catch (error) {
		throw new Error(error.response?.data?.message || error.response?.statusText);
	}
}
export async function onBoardUser(formData) {
	// console.log(formData);
	try {
		const { data } = await axiosInstance.post("/auth", formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		console.log('Data', data);
		return data.data;
	} catch (error) {
		throw new Error(error.response?.data?.message || error.response?.statusText);
	}
}


export const handleLoginSuccess = (userData) => {
	console.log("handle", userData);
	localStorage.setItem('token', userData.accessToken);
	localStorage.setItem('role', userData.role);
};

