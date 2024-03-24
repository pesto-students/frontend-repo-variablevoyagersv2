import { axiosPrivate } from './axios.service';

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
