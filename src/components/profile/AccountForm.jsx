import React, { useEffect, useRef, useState } from 'react';
import Input from '../forms/Input';
import { useForm } from 'react-hook-form';
import InputField from '../forms/InputField';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setUser } from '../../redux/slices/authSlice';
import { toast } from 'react-toastify';
import { updateUser } from '../../services/user.service';
import Button from '../common/Button';
import EyeIcon from '../../assets/icons/eye.png';
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
			setValue('firstName', user?.firstName);
			setValue('lastName', user?.lastName);
			setValue('email', user?.email);
			setFilePreview(user?.avatar);
			setValue('phone', user?.phone);
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
			const updatedUser = await updateUser(user?.id, formData);
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
						<p className="mt-1 text-sm text-gray-500">Ensure your profile information is up to date.</p>
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

								<input ref={fileInputRef} type="file" className="hidden" accept=".jpg,.jpeg,.png" onChange={handleFileInputChange} />
							</div>
							{fileErr && <span className="text-red-500 mt-2">{fileErr}</span>}
						</div>
						<div className="col-span-6 sm:col-span-3">
							<div>
								<InputField label="First Name" id="firstName" name="firstName" register={register} required={true} error={errors?.firstName} />
								{errors.firstName && <span className="text-red-500 text-sm">First name is required</span>}
							</div>
						</div>

						<div className="col-span-6 sm:col-span-3">
							<div>
								<InputField label="Last name" id="lastName" name="lastName" register={register} required={true} error={errors?.lastName} />
								{errors.lastName && <span className="text-red-500 text-sm">Last name is required</span>}
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
								{errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
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
								{errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
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

export default AccountForm;
