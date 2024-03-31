import React, { useEffect, useRef, useState } from 'react';
import Input from '../forms/Input';
import { useForm } from 'react-hook-form';
import InputField from '../forms/InputField';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setUser } from '../../redux/slices/authSlice';
import { toast } from 'react-toastify';
import { updateUser } from '../../services/user.service';

const AccountForm = () => {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const fileInputRef = useRef(null);

	const [fileErr, setFileErr] = useState(null);
	const [selectedFile, setSelectedFile] = useState(null);
	const [filePreview, setFilePreview] = useState(null);
	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm();
	useEffect(() => {
		if (user) {
			setValue('firstName', user.firstName);
			setValue('lastName', user.lastName);
			setValue('email', user.email);
			setFilePreview(user.avatar);
			setValue('phone', user.phone);
		}
	}, [user, setValue]);
	const handleFileInputChange = (e) => {
		const fileInput = fileInputRef.current;
		const file = e.target.files[0];

		// Validate file type
		const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
		if (!allowedExtensions.exec(file.name)) {
			setFileErr('Only jpg/jpeg and png files are allowed.');
			return;
		}

		// Validate file size
		const maxSize = 5 * 1024 * 1024; // 5 MB in bytes
		if (file.size > maxSize) {
			setFileErr('File size exceeds 5MB limit.');
			return;
		}
		setFileErr(null);
		setSelectedFile(file);
		const reader = new FileReader();
		reader.onload = () => {
			setFilePreview(reader.result);
		};
		reader.readAsDataURL(file);

		if (fileInput) {
			fileInput.value = null;
		}
	};
	const onSubmit = async (data) => {
		if (fileErr) return;
		try {
			const formData = new FormData();
			formData.append('firstName', data.firstName);
			formData.append('lastName', data.lastName);
			formData.append('email', data.email);
			formData.append('phone', data.phone);
			if (selectedFile) {
				formData.append('avatar', selectedFile);
			}
			const updatedUser = await updateUser(user.id, formData);
			dispatch(setUser(updatedUser));
			toast.success('Profile updated');
		} catch (error) {
			toast.error(error.message);
		}
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="shadow sm:overflow-hidden sm:rounded-md">
				<div className="space-y-6 bg-white px-4 py-6 sm:p-6">
					<div>
						<h3 className="text-base font-semibold leading-6 text-gray-900">Personal Information</h3>
						{/* <p className="mt-1 text-sm text-gray-500">Use a permanent address where you can recieve mail.</p> */}
					</div>

					<div className="grid grid-cols-6 gap-6">
						<div className="col-span-6">
							<label className="block text-sm font-medium leading-6 text-gray-900">Avatar</label>
							<div className="mt-2 flex items-center">
								{filePreview ? (
									<img
										src={filePreview}
										alt="Selected File"
										className="cursor-pointer inline-block h-16 w-16 rounded-full object-cover"
										onClick={() => fileInputRef.current.click()}
									/>
								) : (
									<span
										className="cursor-pointer inline-block h-16 w-16 overflow-hidden rounded-full bg-gray-100"
										onClick={() => fileInputRef.current.click()}
									>
										<svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
											<path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
										</svg>
									</span>
								)}
								{/* <button
									type="button"
									className="ml-5 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
									onClick={() => fileInputRef.current.click()}
								>
									Change
								</button>*/}
								<input ref={fileInputRef} type="file" className="hidden" accept=".jpg,.jpeg,.png" onChange={handleFileInputChange} />
							</div>
							{fileErr && <span className="text-red-500 mt-2">{fileErr}</span>}
						</div>
						<div className="col-span-6 sm:col-span-3">
							<div>
								<InputField label="First Name" id="firstName" name="firstName" register={register} required={true} error={errors?.firstName} />
								{errors.firstName && <span className="text-red-500">First name is required</span>}
							</div>
						</div>

						<div className="col-span-6 sm:col-span-3">
							<div>
								<InputField label="Last name" id="lastName" name="lastName" register={register} required={true} error={errors?.lastName} />
								{errors.lastName && <span className="text-red-500">Last name is required</span>}
							</div>
						</div>

						<div className="col-span-6 sm:col-span-3">
							<div>
								<InputField
									disabled={true}
									label="Email"
									id="email"
									name="email"
									type="email"
									register={register}
									required="Email is required"
									error={errors?.email}
								/>
								{errors.email && <span className="text-red-500">{errors.email.message}</span>}
							</div>
						</div>

						<div className="col-span-6 sm:col-span-3">
							<div>
								<InputField
									label="Phone"
									id="phone"
									name="phone"
									type="number"
									register={register}
									required="Phone is required"
									error={errors?.phone}
								/>
								{errors.phone && <span className="text-red-500">{errors.phone.message}</span>}
							</div>
						</div>
					</div>
				</div>
				<div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
					<button
						disabled={isSubmitting}
						type="submit"
						className={`rounded-full px-4 py-2.5 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-32 h-10 ${
							isSubmitting ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-500'
						}`}
					>
						{isSubmitting ? (
							<div className="flex justify-center">
								<svg
									aria-hidden="true"
									role="status"
									className=" w-4 h-4 text-white animate-spin"
									viewBox="0 0 100 101"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
										fill="#E5E7EB"
									/>
									<path
										d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
										fill="currentColor"
									/>
								</svg>
							</div>
						) : (
							'Save changes'
						)}
					</button>
				</div>
			</div>
		</form>
	);
};

export default AccountForm;
