import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
import InputField from '../../components/forms/InputField';
import ImageUpload from '../../components/forms/ImageUpload';
import TextAreaField from '../../components/forms/TextAreaField';
import { toast } from 'react-toastify';
import axios from 'axios';
import { selectUser } from '../../redux/slices/authSlice';
import { useSelector } from 'react-redux';
import { axiosPrivate } from '../../services/axios.service';
import Button from '../../components/common/Button';
import AccountForm from '../../components/profile/AccountForm';
import ChangePasswordForm from '../../components/profile/ChangePasswordForm';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import PropertyDetails from '../../components/propertyForm/PropertyDetails';
import PropertyAddress from '../../components/propertyForm/PropertyAddress';
const AddPropertyPage = () => {
	// const user = useSelector(selectUser);
	// const [propertyImages, setPropertyImages] = useState([]);

	// const handleImagesChange = (images) => {
	// 	setPropertyImages(images);
	// };

	// const {
	// 	register,
	// 	handleSubmit,
	// 	reset,
	// 	formState: { errors, isSubmitting },
	// } = useForm();

	// const onSubmit = async (data) => {
	// 	let fd = new FormData();
	// 	fd.append('propertyName', data.propertyName);
	// 	fd.append('description', data.description);
	// 	fd.append('capacity', data.capacity);
	// 	fd.append('price', data.price);
	// 	fd.append('address', data.address);
	// 	fd.append('city', data.city);
	// 	fd.append('country', data.country);
	// 	fd.append('pincode', data.pincode);
	// 	fd.append('ownerId', user?.id);
	// 	fd.append('checkInTime', data?.checkInTime);
	// 	fd.append('checkOutTime', data?.checkOutTime);
	// 	propertyImages.forEach((f) => {
	// 		fd.append(`propertyImages`, f.file);
	// 		fd.append(`captions`, f.caption);
	// 	});
	// 	try {
	// 		const res = await axiosPrivate.post(`property`, fd, {
	// 			headers: {
	// 				'Content-Type': 'multipart/form-data',
	// 			},
	// 		});

	// 		if (res.data.success) {
	// 			reset();
	// 			setPropertyImages([]);
	// 			toast.success('Property is added');
	// 		} else {
	// 			toast.error('Something went wrong');
	// 		}
	// 	} catch (e) {
	// 		toast.error('Something went wrong');
	// 	}
	// };

	const [view, setView] = useState('property-details');

	const methods = useForm();
	const {
		register,
		handleSubmit,
		// Read the formState before render to subscribe the form state through the Proxy
		formState: { errors, isDirty, isSubmitting, touchedFields, submitCount },
	} = methods;
	console.log({ errors, isDirty, isSubmitting, touchedFields, submitCount });
	const onSubmit = (data) => console.log(data);

	return (
		<>
			<div className="md:flex md:items-center md:justify-between mb-8">
				<div className="min-w-0 flex-1">
					<h2 className="text-2xl font-bold leading-7 text-gray-50 sm:truncate sm:text-3xl sm:tracking-tight">Profile Settings</h2>
					<p className="mt-1 text-sm text-gray-50">Keep your profile up to date </p>
				</div>
			</div>
			<div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
				<aside className="px-2 py-6 sm:px-6 lg:col-span-3 lg:px-0 lg:py-0">
					<nav className="flex gap-2  lg:flex-col">
						<a
							onClick={() => setView('property-details')}
							className={`cursor-pointer group flex items-center rounded-md px-3 py-2 text-sm font-medium  ${
								view === 'property-details' ? 'bg-gray-50 text-gray-900' : 'hover:bg-gray-50 hover:text-gray-900 text-gray-50'
							}`}
						>
							<span className="truncate">Property Details</span>
						</a>
						<a
							onClick={() => setView('property-address')}
							className={`cursor-pointer group flex items-center rounded-md px-3 py-2 text-sm font-medium ${
								view === 'property-address' ? 'bg-gray-50 text-gray-900' : 'hover:bg-gray-50 hover:text-gray-900 text-gray-50'
							}`}
						>
							<span className="truncate">Property Address</span>
						</a>
					</nav>
				</aside>

				<div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
					<FormProvider {...methods}>
						<form onSubmit={methods.handleSubmit(onSubmit)}>
							{view === 'property-details' && <PropertyDetails />}
							{view === 'property-address' && <PropertyAddress />}
							<div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
								<Button
									buttonType="submit"
									size="md"
									variant="filled"
									loading={methods.isSubmitting}
									disabled={methods.isSubmitting}
									innerClass="w-36"
								>
									{methods.isSubmitting ? 'Loading...' : 'Submit'}
								</Button>
							</div>
						</form>
					</FormProvider>
				</div>
			</div>

			{/* <div className="md:flex md:items-center md:justify-between mb-8">
				<div className="min-w-0 flex-1">
					<h2 className="text-2xl font-bold leading-7 text-gray-50 sm:truncate sm:text-3xl sm:tracking-tight">Add Property</h2>
					<p className="mt-1 text-sm text-gray-50">List out your property</p>
				</div>
			</div>

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="shadow sm:overflow-hidden sm:rounded-md mb-5">
					<div className="space-y-6 bg-white px-4 py-6 sm:p-6">
						<div>
							<h3 className="text-base font-semibold leading-6 text-gray-900">Property Information</h3>
							<p className="mt-1 text-sm text-gray-500">Provide information about the property.</p>
						</div>
						<div className="grid grid-cols-6 gap-6">
							<div className="col-span-6 sm:col-span-2">
								<div>
									<InputField
										label="Property Name"
										id="propertyName"
										name="propertyName"
										register={register}
										required={true}
										error={errors?.propertyName}
									/>
									{errors.propertyName && <span className="text-red-500 text-sm">Property Name is required</span>}
								</div>
							</div>
							<div className="col-span-6 sm:col-span-2">
								<div>
									<InputField label="Capacity" id="capacity" name="capacity" register={register} required={true} error={errors?.capacity} />
									{errors.capacity && <span className="text-red-500 text-sm">Capacity is required</span>}
								</div>
							</div>
							<div className="col-span-6 sm:col-span-2">
								<div>
									<InputField label="Price" id="price" name="price" register={register} required={true} error={errors?.price} />
									{errors.price && <span className="text-red-500 text-sm">Price is required</span>}
								</div>
							</div>
							<div className="col-span-6 sm:col-span-6">
								<TextAreaField label="Description" id="description" name="description" register={register} required={true} />
								{errors.description && <span className="text-red-500 text-sm">Description is required</span>}
							</div>
						</div>
					</div>
				</div>
				<div className="shadow sm:overflow-hidden sm:rounded-md mb-5">
					<div className="space-y-6 bg-white px-4 py-6 sm:p-6">
						<div>
							<h3 className="text-base font-semibold leading-6 text-gray-900">Property Address</h3>
							<p className="mt-1 text-sm text-gray-500">Please enter the address of the property.</p>
						</div>
						<div className="grid grid-cols-6 gap-6">
							<div className="col-span-6 sm:col-span-2">
								<div>
									<InputField label="City" id="city" name="city" register={register} required={true} error={errors?.city} />
									{errors.city && <span className="text-red-500 text-sm">City is required</span>}
								</div>
							</div>
							<div className="col-span-6 sm:col-span-2">
								<div>
									<InputField label="Country" id="country" name="country" register={register} required={true} error={errors?.country} />
									{errors.country && <span className="text-red-500 text-sm">Country is required</span>}
								</div>
							</div>
							<div className="col-span-6 sm:col-span-2">
								<div>
									<InputField label="Pincode" id="pincode" name="pincode" register={register} required={true} error={errors?.pincode} />
									{errors.pincode && <span className="text-red-500 text-sm">Pincode is required</span>}
								</div>
							</div>
							<div className="col-span-6 sm:col-span-6">
								<TextAreaField label="Address" id="address" name="address" register={register} required={true} />
								{errors.address && <span className="text-red-500 text-sm">Address is required</span>}
							</div>
						</div>
					</div>
				</div>
				<div className="shadow sm:overflow-hidden sm:rounded-md mb-5">
					<div className="space-y-6 bg-white px-4 py-6 sm:p-6">
						<div>
							<h3 className="text-base font-semibold leading-6 text-gray-900">Prefered time</h3>
							<p className="mt-1 text-sm text-gray-500">Please provide your preferred check-in and check-out times.</p>
						</div>

						<div className="grid grid-cols-6 gap-6">
							<div className="col-span-6 sm:col-span-3">
								<div>
									<InputField
										label="Check In Time"
										id="checkInTime"
										name="checkInTime"
										type="time"
										register={register}
										required={true}
										error={errors?.checkInTime}
									/>
									{errors.checkInTime && <span className="text-red-500 text-sm">Check In Time is required</span>}
								</div>
							</div>
							<div className="col-span-6 sm:col-span-3">
								<div>
									<InputField
										label="Check Out Time"
										id="checkOutTime"
										name="checkOutTime"
										type="time"
										register={register}
										required={true}
										error={errors?.checkOutTime}
									/>
									{errors.checkOutTime && <span className="text-red-500 text-sm">Check Out Time is required</span>}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="shadow sm:overflow-hidden sm:rounded-md">
					<div className="space-y-6 bg-white px-4 py-6 sm:p-6">
						<div>
							<h3 className="text-base font-semibold leading-6 text-gray-900">Property Images</h3>
							<p className="mt-1 text-sm text-gray-500">Upload images of the property.</p>
						</div>
						<ImageUpload onImagesChange={handleImagesChange} />
					</div>

					<div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
						<Button buttonType="submit" size="md" variant="filled" loading={isSubmitting} disabled={isSubmitting} innerClass="w-36">
							{isSubmitting ? 'Loading...' : 'Submit'}
						</Button>
					</div>
				</div>
			</form> */}
		</>
	);
};

export default AddPropertyPage;
