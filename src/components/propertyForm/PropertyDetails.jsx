import React from 'react';
import { useFormContext } from 'react-hook-form';
import InputField from '../forms/InputField';
import TextAreaField from '../forms/TextAreaField';

const PropertyDetails = () => {
	const {
		register,
		formState: { errors },
		watch,
	} = useFormContext();

	return (
		<div className="shadow sm:overflow-hidden sm:rounded-md">
			<div className="space-y-6 bg-white px-4 py-6 sm:p-6">
				<div>
					<h3 className="text-base font-semibold leading-6 text-gray-900">Property Details</h3>
					<p className="mt-1 text-sm text-gray-500">Provide basic information about the property</p>
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

							{errors?.propertyName && <span className="text-red-500 text-sm">Property Name is required</span>}
						</div>
					</div>
					<div className="col-span-6 sm:col-span-2">
						<div>
							<InputField label="Capacity" id="capacity" name="capacity" register={register} required={true} error={errors?.capacity} />
							{errors?.capacity && <span className="text-red-500 text-sm">Capacity is required</span>}
						</div>
					</div>
					<div className="col-span-6 sm:col-span-2">
						<div>
							<InputField label="Price" id="price" name="price" register={register} required={true} error={errors?.price} />
							{errors?.price && <span className="text-red-500 text-sm">Price is required</span>}
						</div>
					</div>

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
					<div className="col-span-6 sm:col-span-6">
						<TextAreaField
							label="Description"
							id="description"
							name="description"
							register={register}
							required={true}
							maxLength="500"
							watch={watch}
						/>
						{errors?.description && <span className="text-red-500 text-sm">Description is required</span>}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PropertyDetails;
