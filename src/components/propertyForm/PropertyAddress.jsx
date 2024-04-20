import React from 'react';
import { useFormContext } from 'react-hook-form';
import InputField from '../forms/InputField';
import TextAreaField from '../forms/TextAreaField';

const PropertyAddress = () => {
	const {
		register,
		formState: { errors, isSubmitting },
	} = useFormContext();
	return (
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
							{errors?.city && <span className="text-red-500 text-sm">City is required</span>}
						</div>
					</div>
					<div className="col-span-6 sm:col-span-2">
						<div>
							<InputField label="Country" id="country" name="country" register={register} required={true} error={errors?.country} />
							{errors?.country && <span className="text-red-500 text-sm">Country is required</span>}
						</div>
					</div>
					<div className="col-span-6 sm:col-span-2">
						<div>
							<InputField label="Pincode" id="pincode" name="pincode" register={register} required={true} error={errors?.pincode} />
							{errors?.pincode && <span className="text-red-500 text-sm">Pincode is required</span>}
						</div>
					</div>
					<div className="col-span-6 sm:col-span-6">
						<TextAreaField label="Address" id="address" name="address" register={register} required={true} />
						{errors?.address && <span className="text-red-500 text-sm">Address is required</span>}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PropertyAddress;
