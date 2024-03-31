import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/authSlice';
import InputField from '../forms/InputField';

const ChangePasswordForm = () => {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);

	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm();

	const onSubmit = async (data) => {
		console.log(data);
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="shadow sm:overflow-hidden sm:rounded-md">
				<div className="space-y-6 bg-white px-4 py-6 sm:p-6">
					<div>
						<h3 className="text-base font-semibold leading-6 text-gray-900">Change password</h3>
						<p className="mt-1 text-sm text-gray-500">Use a strong password</p>
					</div>

					<div className="grid grid-cols-6 gap-6">
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
								{errors.newPassword && <span className="text-red-500">New password is required</span>}
							</div>
						</div>

						<div className="col-span-6 sm:col-span-3">
							<div>
								<InputField
									label="Confirm password"
									id="confirmPassword"
									name="confirmPassword"
									register={register}
									required={true}
									error={errors?.confirmPassword}
								/>
								{errors.confirmPassword && <span className="text-red-500">Confirm password is required</span>}
							</div>
						</div>
					</div>
				</div>
				<div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
					<button
						type="submit"
						className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						Save
					</button>
				</div>
			</div>
		</form>
	);
};

export default ChangePasswordForm;
