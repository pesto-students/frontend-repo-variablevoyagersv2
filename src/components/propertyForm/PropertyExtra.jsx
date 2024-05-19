import React from 'react';
import { useFormContext } from 'react-hook-form';

import TextAreaField from '../forms/TextAreaField';

const PropertyExtra = () => {
	const {
		register,
		formState: { errors, isSubmitting },
	} = useFormContext();
	return (
		<div className="shadow sm:overflow-hidden sm:rounded-md">
			<div className="space-y-6 bg-white px-4 py-6 sm:p-6">
				<div>
					<h3 className="text-base font-semibold leading-6 text-gray-900">Additional Information</h3>
					<p className="mt-1 text-sm text-gray-500">Provide any extra information about the property that guests might need to know.</p>
				</div>
				<div className="grid grid-cols-6 gap-6">
					<div className="col-span-6 sm:col-span-6">
						<TextAreaField label="Extra Information" id="extraInfo" name="extraInfo" register={register} />
						{/* {errors?.extraInfo && <span className="text-red-500 text-sm">Description is required</span>} */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PropertyExtra;
