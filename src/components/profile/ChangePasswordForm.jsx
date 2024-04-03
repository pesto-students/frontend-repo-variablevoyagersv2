import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, selectUser } from '../../redux/slices/authSlice';
import InputField from '../forms/InputField';
import Button from '../common/Button';
import { toast } from 'react-toastify';
import { axiosPrivate } from '../../services/axios.service';
import { useNavigate } from 'react-router-dom';

const ChangePasswordForm = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector(selectUser);

	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm();

	const onSubmit = async (fd) => {
		try {
			const reqObj = { id: user?.id, oldPassword: fd.oldPassword, newPassword: fd.newPassword };

			const { data } = await axiosPrivate.post('/auth/change-password', reqObj);
			dispatch(clearUser());
			navigate('/login');
			toast.success('Password updated');
		} catch (error) {
			toast.error(error.response.data.message);
		}
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="shadow sm:overflow-hidden sm:rounded-md">
				<div className="space-y-6 bg-white px-4 py-6 sm:p-6">
					<div>
						<h3 className="text-base font-semibold leading-6 text-gray-900">Change password</h3>
						<p className="mt-1 text-sm text-gray-500">Update your password for enhanced security.</p>
					</div>

					<div className="grid grid-cols-6 gap-6">
						<div className="col-span-6 sm:col-span-3">
							<div>
								<InputField
									label="Old password"
									id="oldPassword"
									name="oldPassword"
									register={register}
									required={true}
									error={errors?.oldPassword}
								/>
								{errors.oldPassword && <span className="text-red-500 text-sm">Old password is required</span>}
							</div>
						</div>
						<div className="col-span-6 sm:col-span-3">
							<div>
								<InputField
									label="New password"
									id="newPassword"
									name="newPassword"
									type="password"
									register={register}
									required={true}
									error={errors?.newPassword}
								/>
								{errors.newPassword && <span className="text-red-500 text-sm">New password is required</span>}
							</div>
						</div>
					</div>
				</div>
				<div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
					<Button buttonType="submit" size="md" variant="filled" loading={isSubmitting} disabled={isSubmitting} innerClass="w-36">
						{isSubmitting ? 'Loading...' : 'Save Changes'}
					</Button>
				</div>
			</div>
		</form>
	);
};

export default ChangePasswordForm;
